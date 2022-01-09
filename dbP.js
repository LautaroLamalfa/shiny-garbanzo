const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "desafio7",
    },
  
    pool: { min: 2, max: 8,  },
  });

  knex.schema
  .createTableIfNotExists("productos", function (table) {
    table.increments("id").primary();
    table.string("nombre");
    table.float("precio");
    table.string("imagen");  
  })
  .then(() => {
    console.log("Tabla de Productos creada");
  })
  .catch((err) => {
    throw err;
  });

  

module.exports = knex;
