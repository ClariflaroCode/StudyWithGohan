function traerLista() {
    let cantidad = 0;
    cantidad= Number(sessionStorage.getItem("cantidadTareas"));
    
    for (let i = 0; i < cantidad; i++) {

        let identificador = "tarea" + i;
        let tarea = sessionStorage.getItem(identificador).toString();

        let identificadorCheck = "checkbox" + i;

        if (tarea) {
            
            document.getElementById("to-do-list").innerHTML += `<div class="list-item-checkbox"> <li id="${identificador}">${tarea}</li>` + `<input class="tomaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;
        }

    }
}
traerLista();

let checks = document.getElementsByClassName("tomaste-tarea");
for (let i = 0; i < checks.length; i++) {
    checks[i].addEventListener("click", seleccionarTareas);
}

function seleccionarTareas(){
    let cantidad = 0;
    cantidad= Number(sessionStorage.getItem("cantidadTareas"));

    if (cantidad != null) {
        for (let i = 0; i < cantidad; i++) {
            let identificadorCheck = "checkbox" + i;
            let identificador = "tarea" + i;
            let checkbox = document.getElementById(identificadorCheck);
            if(checkbox.checked) {
                let idTareaEnProgreso = "tarea_" + i + "_tomada"; 
                sessionStorage.setItem(idTareaEnProgreso, sessionStorage.getItem(identificador).toString());
                sessionStorage.removeItem(identificador);
            }
        }
    }
}

