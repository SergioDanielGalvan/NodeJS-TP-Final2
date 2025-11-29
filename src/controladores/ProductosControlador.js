import * as model from "../modelos/Productos.js";

const cLargoMinimoNombre = 10;
const cLargoMaxinoNombre = 40;

export const getAllProductos = async ( req, res ) => {
  try {
    const productos = await model.getAllProductos( '', false );
    if ( !productos ) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    res.status(200).json( productos );
  } catch ( error ) {
    res.status(500).json({ error: "Error del servidor" });
  }

};

export const getAllProductosByCategoria = async ( req, res ) => {
  try {
    const { categoria } = req.params;
    const productos = await model.getAllProducts( categoria, false );
    if ( !productos ) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    res.status(200).json( productos );
  } catch ( error ) {
    res.status(500).json({ error: "Error del servidor" });
  }
  finally {
  }
}
;

export const getProductoById = async ( req, res ) => {
  try { 
    const { id } = req.params;
    const product0 = await model.getProductoById( id );
    if ( !producto ) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json( producto );
  } catch ( error ) {
    res.status(500).json({ error: "Error del servidor" });
  }
  finally {
  }

};

export const createProducto = async ( req, res ) => {
  // Checks
  if ( typeof req.body.nombre == undefined ) {
    return res.status(422).json({ error: `El nombre es obligatorio` });
  }
  else if( req.body.nombre .length < cLargoMinimoNombre ) {
    return res.status(422).json({ error: `El nombre debe tener al menos ${cLargoMinimoNombre} caracteres` });
  }
  else if( req.body.nombre .length > cLargoMaxinoNombre ) {
    return res.status(422).json({ error: `El nombre no debe exceder los ${cLargoMaxinoNombre} caracteres` });
  }


  const { nombre, precio, categorias, stock } = req.body;

  const producto = await model.createProducto( nombre, precio, categorias, stock );

  res.status(201).json( producto );
};

class Producto  {
  constructor( id, nombre, precio, categorias, stock ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categorias = categorias;
    this.stock = stock;
  }
}

class Productos {
  constructor() {
    this.productos = [];
    this.lastId = 0;  // Saldría de la base de datos
  }

  async addProducto( nombre, precio, categorias ) {
    const nuevoProducto = new Producto( ++this.lastId, nombre, precio, categorias );
    this.productos.push( nuevoProducto );
    return nuevoProducto;
  }

  async getAllProductos( req, res ) {
    return this.productos;
  }

  async getProductoById( req, res ) {
    const { id } = req.params;
    const producto = await model.getProductById( id );
    return this.productos.find( p => p.id == id );
  }

}

export const productosInstance = new Productos();
