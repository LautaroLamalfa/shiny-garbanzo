const knex = require('../dbM');

class Contenedor {

    constructor(name) {
        this.name = name
    }

    async save(message) {
        knex(this.name).insert(message)
        .then(() => {
          console.log("Register ok!");
        })
        .catch((err) => {
          console.log("Error publicando un mensaje");
          console.log(err)
        });
    }

    async getById(num) {
        try{
            let data = await knex.from(this.name).select("*").where({ id: num  });
          console.log("HOLA")
            data = data[0];
            data = {id:data.id, date: data.date, message:data.message, email:data.email}
            return data;
        }catch(error){
            throw(error);
        }
    }

    async getAll() {
        try{
            let data = await knex.from(this.name).select("*").orderBy("id", "ascd");
            let messages = [];
            for (const msg of data) {
                let aux = {
                    id: msg['id'],
                    date: msg['date'],
                    message: msg['message'],
                    email: msg['email']
                }
                messages.push(aux);
            }
            return messages;
            
        }catch(error){
            throw(error);
        }
        
    }

    async deleteById(num) {
        try {
            let data = await knex(this.name).where({ id: num }).del();
            return data; 
        } catch (error) {
            throw(error);
        }
    }

    async deleteAll() {
        knex(this.name).del()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
}

module.exports = Contenedor;
