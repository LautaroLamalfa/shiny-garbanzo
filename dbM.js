const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "desafio7",
  },

  pool: { min: 2, max: 8 },
});

 knex.schema
  .createTableIfNotExists("mensajes", function (table) {
    table.increments("id").primary();
    table.string("email");
    table.string("message");  
    table.string("date");
  })
  .then(() => {
    console.log("Tabla de Mensajes creada");
  })
  .catch((err) => {
    throw err;
  });
module.exports = knex;
