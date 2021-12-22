
const knex = require('../db');

class Contenedor {

    constructor(name) {
        this.name = name
    }

    async save(product) {
        knex(this.name).insert(product)
        .then(() => {
          console.log("Register ok!");
        })
        .catch((err) => {
          throw err;
        });
    }

    async getById(num) {
        try{
            let data = await knex.from(this.name).select("*").where({ id: num  });
            data = data[0];
            data = {id:data.id, nombre: data.nombre, precio:data.precio, imagen:data.imagen}
            return data;
        }catch(error){
            throw(error);
        }
    }

    async getAll() {
        try{
            let data = await knex.from(this.name).select("*").orderBy("id", "ascd");
            let productos = [];
            for (const pto of data) {
                let aux = {
                    id: pto['id'],
                    nombre: pto['nombre'],
                    precio: pto['precio'],
                    imagen: pto['imagen']
                }
                productos.push(aux);
            }
            return productos;
            
        }catch(error){
            throw(error);
        }
        
    }

    async deleteById(num) {
        try {
            let borrado = await knex(this.name).where({ id: num }).del();
            return borrado;      
        } catch (error) {
            
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
    
    async update(num, pto){
        try {
            let actualizacion = await knex(this.name).where({ id: num })
            .update({ nombre: pto.nombre, precio: pto.precio, imagen: pto.imagen })
            return actualizacion;
            
        } catch (error) {
            
        }
    }
    
}

module.exports = Contenedor;