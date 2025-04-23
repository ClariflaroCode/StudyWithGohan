document.getElementById("agregar-tarea").addEventListener("click", agregarTarea);
let ultimaTarea = 0;
function agregarTarea(){
    let nuevaTarea = window.prompt("Nueva tarea: ");
    let idNuevo = "tarea" + ultimaTarea;
    let idTareaBoton = "take-tarea" + ultimaTarea;
    document.getElementById("to-do-list").innerHTML = document.getElementById("to-do-list").innerHTML + `<li id="${idNuevo}">`+nuevaTarea+"</li>"; //+`<button id="${idTareaBoton}" class="tomar-tarea" type="text">Tomar esta tarea </button>`;
    ultimaTarea++;
}
//document.getElementsByClassName("tomar-tarea").addEventListener("click", tomarTarea);
//function tomarTarea(){
//    let tareaAPasar = document.getElementById("tarea")
//}

