import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './db.js'; 
import JWTService from './jwtService.js';
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.post('/register', async(req, res)=>{
  const { email, password, rol, name } = req.body;

  try {
    const PasswordHash = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO usuario (email, password, rol,nombre) VALUES (?, ?, ?, ?)';
    
    await pool.query(query, [email, PasswordHash, rol || 'Oyente', name]);

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }});
  
app.post('/login', async(req,res)=>{
  const{email, password}=req.body;
  try{
    const SearchUser='select * from usuario where email=?';
    const[rows]=await pool.query(SearchUser,[email]);
    if (rows.length==0){
      return res.status(401).json({error: 'No existe el usuario'});
    }
    const FoundUser=rows[0];
    const CheckPassword=await bcrypt.compare(password,FoundUser.password);
    if (!CheckPassword){
      return res.status(401).json({error: 'Contrasena incorrecta'})
    }
    const jwtService = new JWTService();
    const tokenGenerado = jwtService.generateJWT(FoundUser);
    res.json({ mensaje: 'Login correcto', token: tokenGenerado });
  }
  catch (error){
    console.error(error);
    res.status(500).json({error: 'Error en el servidor'})
  }
});
 
const verificarToken = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: 'Falta token' });
  
  const token = authHeader.split(' ')[1]; 
  const jwtService = new JWTService();
  
  try {
    const user = jwtService.decodeJWT(token);
    res.locals.user = user; //
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};


app.get('/protected', verificarToken, (req, res) => { 
  const user = res.locals.user;
  res.json({ mensaje: "Usuario confirmado", usuario: user });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});