// src/controladores/authControlers.js
import jwt from "jsonwebtoken";
import connection from "../controladores/conexion_db.js";
import { query } from "../controladores/pool_mySQL.js/";
import crypto from "crypto";

/*
{
  "email": "sdg@gmail.com",
  "password": "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"
}
*/

export const login = async (req, res) => {
  const { email, password } = req.body;
  if ( !email || !password ) {  
    return res.status(400).json({ error: "Faltan credenciales" });
  }
  try {
    //let sql = 'SELECT email, password, intentos FROM operadores WHERE email = ? AND password = ?';
    let sql = 'SELECT email, password, intentos FROM operadores WHERE email = ?';
    const db = await connection();
    const params = [email];
    const [ rows ] = await db.execute(sql, params);
    let usuario = null;
    if ( !rows || rows.length == 0 ) {
      return {"error": "Credenciales no encontradas"};
    }
    if ( rows.length == 1 ) {
      usuario = rows[0]; 
      if ( usuario.email.length == 0 ) { 
        return res.status(401).json({ error: "Credenciales inválidas!" });
      }
      if ( usuario.intentos >= 3 ) {
        return res.status(403).json({ error: "Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador." });
      }
      const hashedPassword = hashString( password );
      if ( hashedPassword !== usuario.password ) {
        // Incrementar el contador de intentos fallidos 
        let sqlUpdate = 'UPDATE operadores SET intentos = intentos + 1 WHERE email = ?';
        const updateParams = [email];
        await db.execute(sqlUpdate, updateParams);
        return res.status(401).json({ error: "Credenciales inválidas!" });
      }

      // Generar el token JWT
      if ( email == usuario.email ) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "V1trS3cr3t!", {
          expiresIn: process.env.JWT_TIEMPO_EXPIRACION || "1h",
        });
        // Set de campos en la tabla operadores
        let sqlUpdate = 'UPDATE operadores SET 	FechaUtimoLogin = NOW(), intentos = 0 WHERE email = ?';
        const updateParams = [email];
        await db.execute(sqlUpdate, updateParams);

        //  Enviar el token en la respuesta
        return res.json({ token });
      }
    } 
  }
  catch (error) {
      console.error(error);
      throw error;
  }
  finally {
    // Liberar si quedó algun recursos en uso
  }
  res.status(401).json({ error: "Credenciales inválidas !" });
};

function hashString( input ) {
    return crypto.createHash('sha256').update(input).digest('hex');
}
