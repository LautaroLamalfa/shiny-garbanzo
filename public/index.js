
const socket = io();

socket.on("render", (data)=>{
    console.log(data);
    renderTabla();
    renderChat();

})

function enviar_formulario(){
    const url = '/api/products';
    let data = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value
    }

    var request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    /* Funcion fetch para postear un nuevo pto */
    fetch(url, request)
        .then(function() {
            document.getElementById('nombre').value="";
            document.getElementById('precio').value="";
            document.getElementById('imagen').value="";
            socket.emit("actualizacion");
    });
    

    return false;
 }

function renderTabla(){
    const tabla = document.getElementById('tBody');
    const url = '/api/products';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${pto.nombre}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `$ ${pto.precio}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<img src = ${pto.imagen} width="60"height="60">`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
      
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function renderChat(){
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        tabla.innerHTML="";
        for (const chat of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="light-blue">${chat.email}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `<font color="brown">${chat.date}</font>`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.message}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function enviarChat(){
    const url = '/api/chat';
    let data = {
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    fetch(url, request)
        .then(function() {
            document.getElementById('message').value = "";
            socket.emit("actualizacion");
    });

    return false;
}