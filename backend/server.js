import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './db.js'; 
import JWTService from './jwt.js';
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.post('/register', async(req, res)=>{
  const { mail, password, rol, name } = req.body;

  try {
    const PasswordHash = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO usuario (mail, password, rol, nombre) VALUES (?, ?, ?, ?)';
    
    await pool.query(query, [mail, PasswordHash, rol, name || 'Oyente']);

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }});
  
  const saltRounds = 15;
app.post('/login', async(req,res)=>{
  const{mail, password}=req.body;
  try{
    const SearchUser='select * from usuario where mail=?';
    const[rows]=await pool.query(SearchUser,[mail]);
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