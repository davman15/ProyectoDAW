import { doc, db, onSnapshot, collection, query, where, orderBy, deleteDoc } from "./firebase.js";

document.addEventListener("readystatechange", cargarEventos, false);
const cajaApuntes = document.getElementById("cajaApuntes");
function cargarEventos() {
  //comprobarApuntes();
  document.getElementById("crearApuntes").addEventListener("click", crearApunte);
  actualizaBienApuntes();
}

function crearApunte() {
  localStorage.setItem("idApunte", "");
  location.href = "./apuntes.php";
}

function actualizaBienApuntes() {
  const referenciaApuntes = collection(db, "Usuarios",localStorage.getItem("id"),"Apuntes");
  const consulta = query(referenciaApuntes, where("usuario", "==", localStorage.getItem("id")), orderBy("fechaApunte", "desc"));
  const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
    const apuntes = [];
    querySnapshot.forEach((doc) => {
      apuntes.push({
        id: doc.id,
        fechaApunte: doc.data().fechaApunte,
        titulo: doc.data().titulo,
        usuario: doc.data().usuario,
        contenido: doc.data().contenido
      });
    });
    actualizarApuntes(apuntes);
  });
}

function actualizarApuntes(apuntes) {
  cajaApuntes.innerHTML = "";
  let html = "";
  apuntes.forEach(apunte => {
    let fecha = new Date(apunte.fechaApunte);
    let formatearFecha = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
    html += `
            <div data-id="${apunte.id}" class="list-group-item list-group-item-action apuntesLista pt-3" aria-current="true">
            ${apunte.titulo}
            <span class="float-end pb-1 fechaGrupo d-flex">
            <button type="button" class="btn btn-outline-info me-5 btn-sm px-3 apuntesVistaVer" data-id="${apunte.id}">Ver</button>
            <button type="button" class="btn btn-outline-danger me-5 btn-sm px-3 apuntesBorrar" style="z-index:4;" data-id="${apunte.id}">Borrar</button>
            ${formatearFecha}</span>
            </div>
        `;
  });
  cajaApuntes.innerHTML = html;
  //Selecciono todos los elementos del html que tengan esa clase
  const listaApuntes = document.querySelectorAll(".apuntesLista");
  const listaApuntesVer = document.querySelectorAll(".apuntesVistaVer");
  seleccionarGrupo(listaApuntes, listaApuntesVer);
  borrarApuntes();
}

function borrarApuntes(){
  document.querySelectorAll(".apuntesBorrar").forEach(apunte => {
    //Saco el id que lleva cada uno
    apunte.addEventListener("click", async (evento) => {
      console.log(evento.target.dataset.id);
      await deleteDoc(doc(db, "Usuarios",localStorage.getItem("id"),'Apuntes', evento.target.dataset.id));
    }, false);
  });
}
function seleccionarGrupo(listaApuntes, listaApuntesVer) {
  //Recorro todos los botones seleccionados
  listaApuntes.forEach(apunte => {
    //Lista de botones para solo editar el apunte
    apunte.addEventListener("dblclick", async (evento) => {
      console.log(evento.target.dataset.id);
      localStorage.setItem("idApunte", evento.target.dataset.id);
      location.href = "apuntes.php";
    }, false);
  });
  //Lista de botones para solo ver el apunte
  listaApuntesVer.forEach(apunte => {
    //Saco el id que lleva cada uno
    apunte.addEventListener("click", async (evento) => {
      console.log(evento.target.dataset.id);
      localStorage.setItem("idApunte", evento.target.dataset.id);
      location.href = "verApuntes.php";
    }, false);
  });
}