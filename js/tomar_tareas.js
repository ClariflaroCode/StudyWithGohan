function traerLista() {
    let cantidad = 0;
    cantidad= Number(sessionStorage.getItem("cantidadTareas"));
    
    for (let i = 0; i < cantidad; i++) {

        let identificador = "tarea" + i;
        let tarea = sessionStorage.getItem(identificador).toString();

        if (tarea) {
            document.getElementById("to-do-list").innerHTML += `<li id="${identificador}">${tarea}</li>`;
        }

    }
}

traerLista();
