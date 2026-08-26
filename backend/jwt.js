import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default class JWTService{
    static SECRET = process.env.JWT_SECRET;
    static EXPIRATION = '2h';


generateJWT(FoundUser){
    return jwt.sign({ id: FoundUser.id, mail: FoundUser.mail, rol: FoundUser.rol, nombre:FoundUser.nombre },JWTService.SECRET,{expiresIn: JWTService.EXPIRATION});
}
decodeJWT(token){
    return jwt.verify(token,JWTService.SECRET);
}}