import { db } from "./firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
  
export const getAllOperadores = async () => {
    try {
        return operadores;
    } 
    catch ( error ) {
        console.error(error);
    }   
    finally {
    }   
};

export const getOperadorById = async ( id ) => {
    try {   
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        return operador;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const getOperadorByEmail = async ( email ) => {
    try {   
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        return operador;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};

export const createOperador = async ( operadorData ) => {
    try {
        if ( !result ) {
            return { "error": "No se pudo crear el operador"};
        }   
        return { id: result.insertId, nombre, email, tipooperador };
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};


export const deleteOperadorByEmail = async ( email ) => {
    try {
        if ( !result ) {
            return { "error": "No se pudo eliminar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};

export const deleteOperadorById = async ( id ) => {
    try {
        if ( !result ) {
            return { "error": "No se pudo eliminar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const updateOperadorByEmail = async ( email, operadorData ) => {
    try {
        if ( !result ) {
            return { "error": "No se pudo actualizar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }
};

export const updateOperadorById = async ( id, operadorData ) => {
    try {
        if ( !result ) {
            return { "error": "No se pudo actualizar el operador"};
        }   
        return result;
    }
    catch ( error ) {
        console.error(error);
    }
    finally {
    }   
};