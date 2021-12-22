const express = require("express")
const chatRoute = require("./routes/chat");
const ptochatRoute = require("./routes/index");
const produtosRoute = require("./routes/productos");


const app = express()


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use("/api/chat", chatRoute);
app.use("/ptochat", ptochatRoute);
app.use("/api/products", produtosRoute);


// Servidor HTTP

const http = require ("http");
const server = http.createServer(app);

// Servidor Socket

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Usuario Conectado");

    socket.emit("render", "Bienvenido Cliente")
    socket.on("actualizacion", ()=>{
    io.sockets.emit("render", "Actualizacion")
  })
})

// Servidor

app.get("/", (req, res) => {
    res.send("Hola desde index.js")
})

server.listen(8081, () => {
    console.log("Servidor 👍 por 8081");
})