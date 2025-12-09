// src/controladores/authControlers.js
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { db } from "../modelos/firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
  
const operadoresCollection = collection(db, "productos");

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
    const snapshot = await getDocs(operadoresCollection);
    let usuario = null;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if ( data.email === email ) {
        // Dam! El forEach no tiene break !
        usuario = data;
      }
    });

    if ( usuario == null ) {
      return {"error": "Credenciales no encontradas"};
    };
    if ( usuario.length == 1 ) {
      if ( usuario.email.length == 0 ) { 
        return res.status(401).json({ error: "Credenciales inválidas!" });
      }
      if ( usuario.intentos >= 3 ) {
        return res.status(403).json({ error: "Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador." });
      }
      const hashedPassword = hashString( password );
      if ( hashedPassword !== usuario.password ) {
        // Incrementar el contador de intentos fallidos
        usuario.intentos = ( usuario.intentos || 0 ) + 1;
        await updateDoc(productoRef, {
          intentos: usuario.intentos,
          fechamodificacion: new Date()
        });
        return res.status(401).json({ error: "Credenciales inválidas!" });
      }

      // Generar el token JWT
      if ( email == usuario.email ) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "V1trS3cr3t!", {
          expiresIn: process.env.JWT_TIEMPO_EXPIRACION || "1h",
        });
        // Set de campos en la tabla operadores
        usuario.intentos = ( usuario.intentos || 0 ) + 1;
        await updateDoc(productoRef, {
          intentos: 0,
          FechaUtimoLogin: new Date()
        });

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
