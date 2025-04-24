let timer= sessionStorage.getItem("timerPomodoro");
document.getElementById("tiempo-pomodoro").innerHTML = timer;
console.log(timer);

let reloj = document.getElementById("temporizador-recreo");
let segundos = 0;
let minutos = 10; 
let horas = 0;
function temporizador() {
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

    return setTimeout(() => temporizador(), 1000);
}
temporizador();


function traerListaDoing() {
    cantidad = Number(sessionStorage.getItem("cantidadTareas"));
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
}
traerListaDoing();

function traerListaToDo() {
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
traerListaToDo();
