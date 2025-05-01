
let cantidadRecreos = sessionStorage.getItem("CantidadDeRecreos");
recreos = Number(cantidadRecreos);
recreos++
sessionStorage.setItem("CantidadDeRecreos", String(recreos));


let timer= sessionStorage.getItem("timerPomodoro");
document.getElementById("tiempo-pomodoro").innerHTML = timer;



let tiempoDeRecreos = sessionStorage.getItem("timerRecreo");
if (tiempoDeRecreos == null) {
    sessionStorage.setItem("timerRecreo", "00:05:00");
    tiempoDeRecreos = sessionStorage.getItem("timerRecreo");
}

let reloj = document.getElementById("temporizador-recreo");

const miArray = tiempoDeRecreos.split(":");

let segundos = Number(miArray[2]);
let minutos = Number(miArray[1]); 
let horas = Number(miArray[0]);


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

    if ((horas == 0) && (minutos == 0) && (segundos == 0)) {
        setTimeout(() => {
            mostrarPopUp();
        }, 1000);
    } else {
       setTimeout(() => temporizador(), 1000);
    }

}
temporizador();



function traerListas() {
        //1. Traer lista de tareas de tareas en progreso
        const tareas= JSON.parse(sessionStorage.getItem("TareasEnProgreso"));

        //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html y al lado un checkbox
        if (tareas != null) {
            for (let i = 0; i < tareas.length; i++) {
    
                //3. Crear el id del checkbox PARA LA TAREA EN PROGRESO, OJOTA QUE NO SE TE MEZCLE EL ****:)
                let identificadorCheck = "checkbox_para_finalizar_tarea" + i;
    
                document.getElementById("doing-list").innerHTML += `<div class="list-item-checkbox"> <li id="${i}">${tareas[i]}</li><input class="finalizaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;
    
            }
        }

        //3. Traer lista de tareas de tareas por hacer
        const tareasPorHacer = JSON.parse(sessionStorage.getItem("TareasPorRealizar"));

        //4. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html y al lado un checkbox
        if (tareasPorHacer != null) {
            for (let i = 0; i < tareasPorHacer.length; i++) {
    
                //3. Crear el id del checkbox
                let identificadorCheck = "checkbox_para_tomar_tarea" + i;
    
                document.getElementById("to-do-list").innerHTML += `<div class="list-item-checkbox"> <li id="${i}">${tareasPorHacer[i]}</li><input class="tomaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;
    
            }
        }

}
traerListas();

function guardarTareasFinalizadas() {
        //1. Queremos traer la lista de tareas por hacer y actualizarla de ser necesario. Si no tiene nada, queda vacía. 
        const tareasPorHacer = JSON.parse(sessionStorage.getItem("TareasPorRealizar"));

        //2. Queremos traer la lista de tareas haciendose y actualizarla. Si no tiene nada, la creamos vacía. 
        const tareasHaciendose = JSON.parse(sessionStorage.getItem("TareasEnProgreso"));

        //3.Traemos o creamos la lista de tareas finalizadas. 
        const tareasTerminadas = JSON.parse(sessionStorage.getItem("TareasFinalizadas")) || [];


        if (tareasHaciendose != null) {

            for (let i = tareasHaciendose.length-1; i >= 0; i--) {

                //4. Crear el id del checkbox
                let identificadorCheck = "checkbox_para_finalizar_tarea" + i;
                //5.Verificaremos si está chequeado el campo, o sea, si se tomó la tarea. 
                let checkbox = document.getElementById(identificadorCheck);

                if (checkbox != null && checkbox.checked) {

                    //6. Agregamos la tarea al arreglo dinámico/lista de tareasHaciendose. 
                    tareasTerminadas.unshift(tareasHaciendose[i]);
                    //7. Eliminamos la tarea del arreglo dinámico de tareas (por hacer)
                    tareasHaciendose.splice(i,1); 
                }
            }
            //10. Guardamos los cambios de las tareas en progreso
           
        }

        //3. Si hay tareas haciendose. 
        if (tareasPorHacer != null) {

            for (let i = tareasPorHacer.length-1; i >= 0; i--) {

                //4. Crear el id del checkbox
                let identificadorCheck = "checkbox_para_tomar_tarea" + i;
                //5.Verificaremos si está chequeado el campo, o sea, si se tomó la tarea. 
                let checkbox = document.getElementById(identificadorCheck);

                if (checkbox != null && checkbox.checked) {

                    //6. Agregamos la tarea al arreglo dinámico/lista de tareasHaciendose. 
                    tareasHaciendose.unshift(tareasPorHacer[i]);
                    //7. Eliminamos la tarea del arreglo dinámico de tareas (por hacer)
                    tareasPorHacer.splice(i,1);

                }
            }


            //10. Guardamos los cambios de las tareas en progreso


        }
        sessionStorage.setItem("TareasPorRealizar", JSON.stringify(tareasPorHacer));  
        sessionStorage.setItem("TareasEnProgreso", JSON.stringify(tareasHaciendose));   
        sessionStorage.setItem("TareasFinalizadas", JSON.stringify(tareasTerminadas));    

}

function mostrarPopUp() {
    //Esta es la función que me va a redirigir a la página que corresponda. 
    //1. Traer el pop-up para mostrarlo. 
    const modal = document.getElementById("pop-up");
    modal.showModal();
    //const fondo = document.getElementById("fondo");
    //fondo.classList.add("fondo_borroso");
    const fondo = document.getElementById("transparencia");
    fondo.classList.add("fondo_borroso");
    guardarTareasFinalizadas();
}

document.getElementById("stop").addEventListener("click", cambiarPagina);

function cambiarPagina() {
    guardarTareasFinalizadas();
    window.location.assign("/fin.html");
}




function actualizarFecha() {
    const currentDate = new Date();

    const dia = currentDate.getDate();
    const mes = currentDate.getMonth() + 1; 
    const yearActual = currentDate.getFullYear();

    const fecha = dia.toString() + "/"+ mes.toString() +"/" + yearActual.toString();

    document.getElementById("fecha-actual").innerHTML = fecha;
}
actualizarFecha();


document.getElementById("agregar-tarea").addEventListener("click", agregarTarea);

function agregarTarea() {

    //1.TRAER EL ARREGLO DEL SESSION STORAGE y Si el arreglo es nulo hay que crearlo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasPorRealizar"))  || [];

    //2. Permitir que el usuario escriba el contenido de la tarea nueva y guardar eso en una variable.
    let nuevaTarea = window.prompt("Nueva tarea: ");


    //3.AGREGAR TAREA AL FINAL si no es null Y QUE INGRESEN ALGO XD!!! tenía el problema de que podían ingresar n espacios vacíos. Así que requiero de expresiones regulares para evitar eso, es la primera vez que implemento esto en javascript pero me alegra aplicar conocimientos de ciencias de la computación 1 <3 
    
    const expresionRegular =  /^[A-Z]|^[0-9]|^[a-z]/; //jsjs virginia, espero no errarle :3 Pero es que empiece con mayuscula, minuscula o un digito la cadena. 

    if (nuevaTarea != null && expresionRegular.test(nuevaTarea)) {
        
        tareas.push(nuevaTarea); 

        //4.Crear id 
        let  idNuevo = (tareas.length - 1).toString();

        //5.Mostrar nueva tarea. 
        let identificadorCheck = "checkbox_para_tomar_tarea" + tareas.length;
    
        document.getElementById("to-do-list").innerHTML += `<div class="list-item-checkbox"> <li id="${idNuevo}">${nuevaTarea}</li><input class="tomaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;


        //6.Guardar cambios en el session Storage
        sessionStorage.setItem("TareasPorRealizar", JSON.stringify(tareas));    
    }
 

}
