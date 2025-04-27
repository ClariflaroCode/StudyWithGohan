

let reloj = document.getElementById("reloj");
let segundos = 15;
let minutos = 0; 
let horas = 0;

let flag = false;


function temporizador() {
    console.log("estoy en temporizador");
    segundos = segundos - 1;

    if (segundos == -1) {
        minutos = minutos - 1;
        segundos = 59;
    }
    if (minutos == -1 ) {
        horas = horas - 1;
        minutos = 59;
    }
    horasMostrar = horas;
    minutosMostrar = minutos;
    segundosMostrar = segundos;

    if(horas < 10) horasMostrar = "0" + horas;
    if(minutos < 10) minutosMostrar = "0" + minutos;
    if(segundos < 10) segundosMostrar = "0" + segundos;

    reloj.innerHTML = horasMostrar + ":" + minutosMostrar + ":" + segundosMostrar;

    if ((horas === 0) && (minutos === 0) && (segundos === 0)) {
        //window.location.href = window.location.origin + "/pomodoro.html";
        //window.location.assign("../pomodoro.html");
        setTimeout(() => {
            mostrarPopUp();
        }, 1000);
    } else {
        return setTimeout(temporizador, 1000);
    }

}
temporizador();




//si el temporizador llega a cero usando el objeto window podremos cambiar la url y redireccionarlo a la otra pagina. OJO porque el replace me reemplaza la ultima unidad del stack y el push la agrega al final, queremos agregarla al final. 



function traerListaDoing() {

    //1.Traer la lista del storage y convertirlo a formato JSON para que no sea sólo un string y poder tratarlo como un arreglo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasEnProgreso"));

    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html. 
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            document.getElementById("doing-list").innerHTML += `<li id="${i}">${tareas[i]}</li>`;
        }
    }

    /**
     *     
     * cantidad = Number(sessionStorage.getItem("cantidadTareas"));
    if (cantidad != null) {
        for (let i = 0; i < cantidad; i++) {
            let idTareaEnProgreso = "tarea_" + i + "_tomada"; 
            let idTarea = "tarea" + i;
            let tarea = sessionStorage.getItem(idTareaEnProgreso);
            let identificadorCheck = "checkbox" + i;
            if(tarea != null) {                
                document.getElementById("doing-list").innerHTML += `<div class="list-item-checkbox"> <li id="${idTarea}">${tarea}</li>`+ `<input class="finalizaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;
            }
    
        }
    } 
     * 
     */

}
traerListaDoing();

/*
function flagCambio() {
    // Cuando termina el pomodoro, vamos a organizate

    //window.location.href = "/organizate.html";
    // Agregar al historial una entrada para que el usuario pueda volver a la página del temporizador
    //window.history.pushState(null, "", window.location.href); // Mantiene la página actual en el historial

    // Ahora reemplazar la entrada actual con la página de pomodoro
     // Primero, usamos pushState para agregar una nueva entrada al historial
     window.history.pushState(null, "", window.location.href);
    
     // Luego, navegamos a la página destino usando assign
     setTimeout(() => {
         window.location.assign("/organizate.html");
     }, 1000);

}
     */



function mostrarPopUp() {
    //Esta es la función que me va a redirigir a la página que corresponda. 
    //1. Traer el pop-up para mostrarlo. 
    const modal = document.getElementById("pop-up");
    modal.showModal();
    //const fondo = document.getElementById("fondo");
    //fondo.classList.add("fondo_borroso"); //esto me pone en blanco y negro la pagina, parece menu de pausa o error xD
    const fondo = document.getElementById("transparencia");
    fondo.classList.add("fondo_borroso");
}

document.getElementById("stop").addEventListener("click", cambiarPagina);

function cambiarPagina() {
    guardarTareasFinalizadas();
    window.location.assign("/fin.html");
}