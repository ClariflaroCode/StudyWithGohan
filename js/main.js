document.getElementById("agregar-tarea").addEventListener("click", agregarTarea);

function traerLista() {

    let cantidad= Number(sessionStorage.getItem("cantidadTareas"));
    if (cantidad != null || cantidad != 0) {
        for (let i = 0; i < cantidad; i++) {

            let identificador = "tarea" + i;
            let tarea = sessionStorage.getItem(identificador).toString();
    
            if (tarea) {
                document.getElementById("to-do-list").innerHTML += `<li id="${identificador}">${tarea}</li>`;
            }
    
        }
    }  
}

traerLista();

function agregarTarea(){
    let cantidad= Number(sessionStorage.getItem("cantidadTareas"));
    if (cantidad == null) {
        cantidad = 0;
    }
    let nuevaTarea = window.prompt("Nueva tarea: ");
    let idNuevo = "tarea" + cantidad;
    let idTareaBoton = "take-tarea" + cantidad;
    document.getElementById("to-do-list").innerHTML = document.getElementById("to-do-list").innerHTML + `<li id="${idNuevo}">`+nuevaTarea+"</li>"; //+`<button id="${idTareaBoton}" class="tomar-tarea" type="text">Tomar esta tarea </button>`;
    cantidad++;
    sessionStorage.setItem(idNuevo, nuevaTarea);
    sessionStorage.setItem("cantidadTareas", String(cantidad));

}
localStorage.clear();



