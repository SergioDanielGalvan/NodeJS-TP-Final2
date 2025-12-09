// src/controladores/OperadoresControlador.js
import * as modelo from "../modelos/Operadores.js";

export const getAllOperadores = async ( req, res ) => {
    try {
        const operadores = await modelo.getAllOperadores();
        if ( !operadores ) {
            return res.status(404).json({ error: "Operadores no encontrados" });
        }
        res.status(200).json( operadores );
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }   
    finally {
    }
};

export const getOperadorById = async ( req, res ) => {
    try {   
        const { id } = req.params;
        const operador = await modelo.getOperadorById( id );
        if ( !operador ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json( operador );
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }
};

export const getOperadorByEmail = async ( req, res ) => {
    try {   
        const { email } = req.params;
        const operador = await modelo.getOperadorByEmail( email );
        if ( !operador ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json( operador );
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }   
};
export const createOperador = async ( req, res ) => {
    try {
        const operadorData = req.body;
        const newOperador = await modelo.createOperador( operadorData );
        res.status(201).json( newOperador );
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }   
};

export const deleteOperadorByEmail = async ( req, res ) => {
    try {
        const { email } = req.params;
        const result = await modelo.deleteOperadorByEmail( email ); 
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador eliminado correctamente" });
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const updateOperadorByEmail = async ( req, res ) => {
    try {
        const { email } = req.params;
        const operadorData = req.body;
        const result = await modelo.updateOperadorByEmail( email, operadorData );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador actualizado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const deleteOperadorById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const result = await modelo.deleteOperadorById( id );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }

        res.status(200).json({ message: "Operador eliminado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const updateOperadorById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const operadorData = req.body;
        const result = await modelo.updateOperadorById( id, operadorData );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador actualizado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};