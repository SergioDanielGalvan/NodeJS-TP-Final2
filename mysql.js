import connection from "./src/controladores/conexion_db.js";

    async function fetchData() {
      const dbconnection = await connection();
      const [rows, fields] = await dbconnection.execute('SELECT * FROM productos');
      console.log('Query results:', rows);
      dbconnection.end(); // Close the connection when done
    }

    fetchData();