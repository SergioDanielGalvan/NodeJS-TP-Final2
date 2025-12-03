    // Using 'mysql2' package
    import mysql from 'mysql2/promise';

   async function connection () {
    try { 

      const connection = await mysql.createConnection( {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tp_nodejs'
      } );
      return connection;
      }
      catch ( error ) {
        console.error( 'Error connecting to the database:', error );
        throw error;
      } 
    }
    
    export default connection;