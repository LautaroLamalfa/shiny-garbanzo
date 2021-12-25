
const express = require("express");
const Contenedor = require("../content/chat");

const { Router } = express;
const router = new Router();

let chat = new Contenedor("message");


//GET TODO EL CHAT
router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();
      res.send(aux);
    }
    catch(error){
      res.status(300).json("Error en todos los chats")
    }  
  }    
  getTodos();

});

//POST CON CHAT
router.post("/", (req, res) => {
  const fecha = new Date();
  let fechaOK = fecha.getDate() + '/' + (fecha.getMonth()+1) + ' - ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
  
  let {email, message } = req.body;
  let newObj = {
    date : fechaOK,
    email,
    message,
  };

  async function saveChat(){
    try {
      await chat.save(newObj);
      res.send({message:'chat agregado'});     
    } catch (error) {
      res.status(300).json("Error en post Chat");
    }
  }
  saveChat();
});

//DELETE CHAT
router.delete("/:id", (req, res) => {
  async function deleteMsg() {
    try {
      let msgDelete = await chat.deleteById(parseInt(req.params.id));
      if (msgDelete != 0){
        res.send({message: "mensaje borrado"});
      }else{
        res.send({message: "mensaje no encontrado"})
      } 
    } catch (error) {
      res.status(300).json("error al borrar");
    }
  }
  deleteMsg();
})


//EXPORT MODULO ROUTER
module.exports = router;