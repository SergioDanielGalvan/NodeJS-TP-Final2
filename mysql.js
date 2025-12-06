//import connection from "./src/controladores/conexion_db.js";
import connection from "./src/controladores/pool_mySQL.js"
import crypto from "crypto";

  function hashString( input ) {
      return crypto.createHash('sha256').update(input).digest('hex');
  }

  console.log( hashString( "12345!" ) );
  /*
  async function fetchData() {
    const dbconnection = await connection();
    const [rows, fields] = await dbconnection.execute('SELECT * FROM productos');
    console.log('Query results:', rows);
    dbconnection.end(); // Close the connection when done
  }

  fetchData();
  */
    