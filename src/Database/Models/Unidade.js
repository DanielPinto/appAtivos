import db from '../SQLiteDatabase';

const headers = "";


db.transaction(tx=>{
   
    //usar durante os testes
    
    //tx.executeSql("DROP TABLE products;");
    
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS unidades (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "mundo INTEGER," +
        "regional INTEGER," +
        "nome_unidade TEXTO);"
    );
});






const create = (obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "INSERT INTO products (" + headers + " ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
           obj,
          //-----------------------
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Error inserting Product: " + JSON.stringify(obj)); // insert falhou
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };

