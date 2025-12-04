import connection from "../controladores/conexion_db.js";
import { query } from "../controladores/pool_mySQL.js/";

export const getAllProductos = async (categoria, stock) => {
  try {
    let sql = 'SELECT id, nombre, precio, stock, categorias FROM productos';
    const db = await connection();
    const [productos] = await db.execute(sql);
    if ( !productos ) {
      return { "error": "No se encontraron productos"};
    }
    return productos;
  }
  catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
  finally { 
  }
}

/*
export const getAllProductos = async (categoria, stock) => {
  try {
    let sql = 'SELECT * FROM productos WHERE 1=1';
    const params = [];

    // Filtrar por stock > 0 si stock es true
    if ( stock ) {
      sql += ' AND stock > 0';
    }

    // Filtrar por categoría si se proporciona
    if (categoria) {
      // Como categorías está almacenado como JSON en la base de datos
      sql += ' AND JSON_CONTAINS(categorias, ?)';
      params.push(`"${categoria}"`); // Necesita las comillas para el JSON
    }

    // Ejecutar la consulta
    const productos = await query(sql, params);
    //const productos = await connection(sql, params);
    
    // Parsear el campo categorías de string JSON a array
    if ( !productos ) {
      const productosParseados = productos.map(producto => ({
        ...producto,
        categorias: JSON.parse(producto.categorias)
      }));
      return productosParseados;
    }
    else {
      return { "error": "No se encontraron productos"};
    }

  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
  finally {
  }
};
*/

export const getProductoById = async (id) => {
  try {
    let sql = 'SELECT id, nombre, precio, stock, categorias FROM productos WHERE id = ?';
    const db = await connection();
    const [productos] = await db.execute(sql, [id] );
    if ( !productos ) {
      return {"error": "Producto no encontrado"};
    }
    return productos;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
};

export const getProductoByNombre = async ( nombre ) => {
  try {
    let sql = 'SELECT id, nombre, precio, stock, categorias FROM productos WHERE nombre LIKE ?%';
    const db = await connection();
    const [producto] = await db.execute(sql, [nombre] );
    return producto;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
};

export const updateStockById = async ( id, stock ) => {
  try {
    let sql = 'UPDATE productos SET stock = ? WHERE id = ?';
    const db = await connection();
    const [result] = await db.execute(sql, [stock, id] );
    return result;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
}

export const deleteProductoById = async ( id ) => {
  try {
    let sql = 'DELETE FROM productos WHERE id = ?';
    const db = await connection();
    const [result] = await db.execute(sql, [id] );
    return result;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
} 

export const createProducto = async ( nombre, precio, categorias, stock ) => {
  try {
    let sql = 'INSERT INTO productos ( nombre, precio, categorias, stock ) VALUES ( ?, ?, ?, ? )';
    const db = await connection();
    const [producto] = await db.execute(sql, [ nombre, precio, JSON.stringify(categorias), stock ] ); 
    return producto;
  } catch (error) {
    console.error(error);
  }
  finally {
  }

};