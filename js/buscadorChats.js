import { listaUsuariosActualizado, doc, db, getAuth, getDoc, setDoc } from "./firebase.js"
const input_buscar = document.getElementById("input_buscador");
const btn_buscar = document.getElementById("btn_Buscar");
const listaUsuarios = document.getElementById("listaUsuarios");

document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    btn_buscar.addEventListener("click", filtrar);
    input_buscar.addEventListener("keyup", filtrar);

}

function filtrar() {
    const auth = getAuth();
    listaUsuarios.innerHTML = '';
    const textoUsuario = input_buscar.value.toLowerCase();
    listaUsuariosActualizado((usuarios) => {
        //Si el usuario ha empezado a escribir
        if (input_buscar.value != "") {
            listaUsuarios.classList.add("caja_ListaUsuarios");
            usuarios.forEach((doc) => {
                //Cogemos de la coleccion el nickname del usuario
                const usuario = doc.data();
                const idUsuario = doc.data().idUsuario;
                //Si encuentra alguna coincidencia
                if (idUsuario.toLowerCase().indexOf(textoUsuario) !== -1) {
                    //Condicion para que el usuario no le aparezca su propio perfil en la busqueda
                    if (idUsuario != auth.currentUser.displayName) {
                        listaUsuarios.innerHTML += `
                            <div class="col-2 ms-3 p-3" style="display:flex; align-items:center;">
                                <img style="width:60px; height:60px; " class="" src=" ${usuario.imagenUsuario}">
                            </div>
                            <div class="col-10 row pt-3">
                                <div class="col-8 centrarBoton">
                                    <h4 class="text-white"> ${idUsuario}</h4>
                                    <h5 class=" mb-0">${usuario.nombre + " " + usuario.apellidos} </h5>
                                </div>
                                <div class="col-4 centrarBoton">
                                    <button class="btn btn-success mt-3 botonIniciarChat" data-id="${doc.id + " " + idUsuario + " " + usuario.nombre + " " + usuario.imagenUsuario}">Abrir Chat</button>
                                </div>
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                    `;
                    }
                }
            });
            comprobarResultadosBusqueda();
            //Selecciono todos los elementos del html que tengan esa clase
            const listaBotonesIniciarChat = listaUsuarios.querySelectorAll(".botonIniciarChat");
            iniciarChat(listaBotonesIniciarChat);
        }
        else {
            listaUsuarios.classList.remove("caja_ListaUsuarios");
        }
    });
}

function comprobarResultadosBusqueda() {
    if (listaUsuarios.innerHTML == '') {
        listaUsuarios.innerHTML += `
            <div class="col-12 row pt-3">
                    <h4 class="text-white text-center">No hay resultados</h4>
            </div>
        `;
    }
}

async function saberExistenciaChat() {
    const referenciaChat = doc(db, "Usuarios/" + localStorage.getItem("id") + "/Chats", localStorage.getItem("idChatInverso"));
    const chat = await getDoc(referenciaChat);
    //Si existe el chat retorna true
    if (chat.exists()) {
        console.log("Existe el chat");
        console.log(localStorage.getItem("idChat"));
        return true;
    } else {
        console.log("No Existe el chat");
        return false;
    }
}

function iniciarChat(listaBotonesIniciarChat) {
    //Coger datos del usuario activo
    const auth = getAuth();
    //Recorro todos los botones seleccionados
    listaBotonesIniciarChat.forEach(boton => {
        //Saco el id que lleva cada uno
        boton.addEventListener("click", (evento) => {
            const idBoton = evento.target.dataset.id;
            const referenciaUsuario = idBoton.split(" ");
            crearChat(referenciaUsuario, auth.currentUser);
        });
    });
}

//Se le pasa como parametro el id del boton que contiene el id del documento del usuario correspondiente
async function crearChat(referenciaUsuario, usuarioActual) {
    const fechaActual = new Date();
    const fechaCreacionChat = fechaActual.toLocaleDateString() + " " + fechaActual.getHours() + ":" + (fechaActual.getMinutes() < 10 ? '0' : '') + fechaActual.getMinutes();
    let idChat = "";
    localStorage.setItem("idChat", usuarioActual.email + " " + referenciaUsuario[0]);
    localStorage.setItem("idChatInverso", referenciaUsuario[0] + " " + usuarioActual.email);
    if (saberExistenciaChat()) {
        idChat = referenciaUsuario[0] + " " + usuarioActual.email;
    } else {
        idChat = usuarioActual.email + " " + referenciaUsuario[0];
    }

    //Se le pasa el id del usuario y se crea la subcolleccion Chats dentro de ese documento
    const chatAjeno = {
        idNombre: usuarioActual.displayName,
        fechaChat: fechaCreacionChat,
        usuarios: [referenciaUsuario[1], usuarioActual.displayName],
        imagenUsuario: referenciaUsuario[3]
    };

    //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos, creando una subcoleccion
    await setDoc(doc(db, "Usuarios/" + referenciaUsuario[0] + "/Chats", idChat), chatAjeno);

    const chatPropio = {
        idNombre: referenciaUsuario[1],
        fechaChat: fechaCreacionChat,
        usuarios: [referenciaUsuario[1], usuarioActual.displayName],
        imagenUsuario: referenciaUsuario[3]
    };

    //Se crea una subcoleccion de Chats 
    await setDoc(doc(db, "Usuarios/" + usuarioActual.email + "/Chats", idChat), chatPropio);

    const chatIndependiente = {
        idNombre: idChat,
        fechaChat: fechaCreacionChat,
        usuarios: [referenciaUsuario[1], usuarioActual.displayName],
        imagenUsuario: referenciaUsuario[3]
    };

    //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos, creando una subcoleccion
    await setDoc(doc(db, "Chats/" + idChat), chatIndependiente);
    //Se le pasa el id del chat que tiene que abrir en chats.html automaticamente
    await localStorage.setItem("idChat", idChat);
    //Y redirige al Usuario a la pestaña donde estaran los chats
    location.href = "chats.html";
}