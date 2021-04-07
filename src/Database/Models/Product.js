import db from '../SQLiteDatabase';

const headers = "codigo,estoque,mundo,"+
"regional,nome_unidade,departamento,area,"+
"serial,imei,periodo_reposicao,familia,marca,"+
"modelo,tamanho,quantidade,etiqueta_ti,responsavel_id,"+
"responsavel_nome,termo_responsabilidade,kit,gerente_ti,"+
"numero_chamado_motivo,nota_fiscal,acesso,observacoes,"+
"data_cadastro,data_atualizacao,usuario";


db.transaction(tx=>{
   
    //usar durante os testes
    
    //tx.executeSql("DROP TABLE products;");
    
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS products (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "codigo TEXTO UNIQUE," +
        "estoque TEXTO," +
        "mundo TEXTO," +
        "regional TEXTO," +
        "nome_unidade TEXTO," +
        "departamento TEXTO," +
        "area TEXTO," +
        "serial TEXTO," +
        "imei TEXTO," +
        "periodo_reposicao TEXTO," +
        "familia TEXTO," +
        "marca TEXTO," +
        "modelo TEXTO," +
        "tamanho TEXTO," +
        "quantidade TEXTO," +
        "etiqueta_ti TEXTO," +
        "responsavel_id TEXTO," +
        "responsavel_nome TEXTO," +
        "termo_responsabilidade TEXTO," +
        "kit TEXTO," +
        "gerente_ti TEXTO," +
        "numero_chamado_motivo TEXTO," +
        "nota_fiscal TEXTO," +
        "acesso TEXTO," +
        "observacoes TEXTO," +
        "data_cadastro TEXTO," +
        "data_atualizacao TEXTO," +
        "usuario TEXTO" +
        ");"
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



  const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        
        tx.executeSql(
          "SELECT * FROM products;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };


  const find = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM products WHERE id=?;",
          [id],
          //-----------------------
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Obj not found: id=" + id); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };



  const update = (id, obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "UPDATE products SET " + 
          "codigo=?," +
          "estoque=?," +
          "mundo=?," +
          "regional=?," +
          "nome_unidade=?," +
          "departamento=?," +
          "area=?," +
          "serial=?," +
          "imei=?," +
          "periodo_reposicao=?," +
          "familia=?," +
          "marca=?," +
          "modelo=?," +
          "tamanho=?," +
          "quantidade=?," +
          "etiqueta_ti=?," +
          "responsavel_id=?," +
          "Responsavel_nome=?," +
          "termo_responsabilidade=?," +
          "kit=?," +
          "gerente_ti=?," +
          "numero_chamado_motivo=?," +
          "nota_fiscal=?," +
          "acesso=?," +
          "observacoes=?," +
          "data_cadastro=?," +
          "data_atualizacao=?," +
          "usuario=? " +
          "WHERE id=?;",
          obj,
          //-----------------------
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject("Error updating obj: id= " + id); // nenhum registro alterado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };


  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM products WHERE id=?;",
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };


  const removeTable = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM products;VACUUM;",
          [],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  };


  export default {
    create,
    update,
    find,
    all,
    remove,
    removeTable,
  };