import { db } from "./firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
  
const operadoresCollection = collection(db, "operadores");
const LIMITE_INTENTOS_FALLIDOS = 5;

export const getAllOperadores = async () => {
    try {
        const snapshot = await getDocs(operadoresCollection);
        const operadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if ( !productos ) {
            return {"error": "Operadores no encontrados"};
        }
        return operadores;
    } 
    catch ( error ) {
        console.error('Error al obtener operadores desde Firestore:', error);
        throw error;
    }   
    finally {
    }   
};

export const getAllOperadoresActivos = async () => {
    try {
        const snapshot = await getDocs(operadoresCollection);
        const operadores = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter( operador => operador.intentos <= LIMITE_INTENTOS_FALLIDOS );
        if ( !productos ) {
            return {"error": "Operadores no encontrados"};
        }
        return operadores;
    } 
    catch ( error ) {
        console.error('Error al obtener operadores desde Firestore:', error);
        throw error;
    }   
    finally {
    }   
};

export const getOperadorById = async ( id ) => {
    try {
        const snapshot = await getDocs(operadoresCollection);
        const operador = snapshot.docs 
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .find(operador => operadores.id === id);
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        return operador;
    }
    catch ( error ) {
        console.error('Error al obtener producto por ID desde Firestore:', error);  
        throw error;
    }
    finally {
    }
};

export const getOperadorByEmail = async ( email ) => {
    try {
        const snapshot = await getDocs(operadoresCollection);
        const operadores = snapshot.docs 
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(producto => producto.email.startsWith(email));
        if ( !operadores ) {
            return { "error": "Operadores no encontrados"};
        }
        return operadores;
    }
    catch ( error ) {
        console.error('Error al buscar Operadores en Firestore:', error);
        throw error;
    }
    finally {
    }   
};

export const createOperador = async ( operadorData ) => {
    try {
        const nuevoOperador = {
            email: operadorData.email, 
            password: hashString( operadorData.password ),
            nombre: operadorData.nombre,
            intentos: 0,
            fechaultimologin: null
        };
        const docRef = await addDoc(operadoresCollection, nuevoOperador);
        return { id: docRef.id, ...nuevoOperador };
    }
    catch ( error ) {
        console.error('Error al intentar crear Operador en Firestore:', error);
        throw error;
    }
    finally {
    }
};

export const deleteOperadorByEmail = async ( email ) => {
    try {
        const coleccion = await getDocs(operadoresCollection);
        const operador = coleccion.docs 
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(producto => producto.email === email );
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        const operadorRef = doc(operadoresCollection, operador.id );
        const snapshot = await getDoc(operadorRef);
        if (!snapshot.exists()) {
            return false;
        }
        await deleteDoc(operadorRef);
            return result;
        }
    catch ( error ) {
        console.error('Error al eliminar Operador en Firestore:', error);
        throw error;
    }
    finally {
    }   
};

export const deleteOperadorById = async ( id ) => {
    try {
        const operadorRef = doc(operadoresCollection, id);
        const snapshot = await getDoc(operadorRef);
        if ( !snapshot.exists() ) {
          return false;
        }
        await deleteDoc(operadorRef);
        return true;
    }
    catch ( error ) {
        console.error('Error al eliminar Operador en Firestore:', error);
        throw error;
    }
    finally {
    }
};

export const updateOperadorByEmail = async ( email, operadorData ) => {
    try {
        // Validaciones previas
        if ( !email || typeof email !== 'string' || email.trim() === '' ) {
            throw new Error("email de operador inválido");
        }
        const coleccion = await getDocs(operadoresCollection);
        const operador = coleccion.docs 
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(producto => producto.email === email );
        if ( !operador ) {
            return { "error": "Operador no encontrado"};
        }
        const operadorRef = doc(operadoresCollection, operador.id );
        const snapshot = await getDoc(operadorRef);
        // Actualizar operador
        result = await updateDoc(operadorRef, operadorData );   
        if ( !result ) {
            return { "error": "No se pudo actualizar el operador"};
        }
        return result;
    }
    catch ( error ) {
        console.error('Error al actualizar operador en Firestore:', error);
        throw error;
    }
    finally {
    }
};

export const updateOperadorById = async ( id, operadorData ) => {
    try {
        // Validaciones previas
        if (!id || typeof id !== 'string') {
        throw new Error("ID de producto inválido");
        }
        const operadorRef = doc(operadoresCollection, id);  
        const snapshot = await getDoc(operadorRef);
        if ( !snapshot.exists() ) {
            throw new Error(`Operador con ID ${id} no encontrado`);
        }
        result = await updateDoc(operadorRef, operadorData );   

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

export const resetIntentosByID = async ( id ) => {
    try {
        const operadorRef = doc(operadoresCollection, id);
        const snapshot = await getDoc(operadorRef);
        if ( !snapshot.exists() ) {
          return false;
        }
        await updateDoc(operadorRef, {
          intentos: 0
        });
        return true;
    }
    catch ( error ) {
        console.error('Error al resetear intentos en Firestore:', error);
        throw error;
    }
    finally {
    }
};