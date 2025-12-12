// src/controladores/authControlers.js
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { db } from "../modelos/firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
  
const operadoresCollection = collection(db, "operadores");

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
    snapshot.forEach( (doc) => {
      const data = { id: doc.id, ...doc.data() };
      if ( data.email == email ) {
        // Dam! El forEach no tiene break !
        usuario = data;
        console.log("Usuario encontrado en login: ", usuario);
      }
    });

    if ( usuario == null ) {
      return {"error": "Credenciales no encontradas"};
    };
    if ( usuario.email == '' ) { 
      return res.status(401).json({ error: "Credenciales inválidas!" });
    }
    if ( usuario.intentos >= 3 ) {
      return res.status(403).json({ error: "Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador." });
    }
    const hashedPassword = hashString( password );
    if ( hashedPassword !== usuario.password ) {
      // Incrementar el contador de intentos fallidos
      usuario.intentos = ( usuario.intentos || 0 ) + 1;
      const productoRef = doc(db, "operadores", usuario.id);
      console.log("Incrementando intentos fallidos a ", usuario.intentos);
      await updateDoc(productoRef, {
        intentos: usuario.intentos,
        fechamodificacion: new Date()
      });
      return res.status(401).json({ error: "Credenciales inválidas!" });
    }

    // Generar el token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "V1trS3cr3t!", {
      expiresIn: process.env.JWT_TIEMPO_EXPIRACION || "1h",
    });
    // Set de campos en la tabla operadores
    console.log("Resetear intentos fallidos a 0 después de login exitoso", usuario.id);
    const productoRef = doc(db, "operadores", usuario.id);
    await updateDoc(productoRef, {
      intentos: 0,
      FechaUtimoLogin: new Date()
    });

    //  Enviar el token en la respuesta
    return res.json({ token });
  }
  catch (error) {
      console.error(error);
      throw error;
  }
  finally {
    // Liberar si quedó algún recursos en uso
  }
  res.status(401).json({ error: "Credenciales inválidas !" });
};

function hashString( input ) {
    return crypto.createHash('sha256').update(input).digest('hex');
}
