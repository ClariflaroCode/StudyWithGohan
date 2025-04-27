

let timer= sessionStorage.getItem("timerPomodoro");
document.getElementById("tiempo-pomodoro").innerHTML = timer;
console.log(timer);

let reloj = document.getElementById("temporizador-recreo");
let segundos = 10;
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

    if ((horas === 0) && (minutos === 0) && (segundos === 1)) {
        //window.location.href = window.location.origin + "/pomodoro.html";
        //window.location.assign("../pomodoro.html");

        ///OTRA POSIBILIDAD ES REEMPLAZAR TODO EL HTML EN LA MISMA PAGINA ACA CUANDO TERMINA EL POMODORO. COMO SE HACE CON EL FRAMEWORK DE REACT. 

        setTimeout(() => {
            mostrarPopUp();
        }, 1000);
    } else {
       setTimeout(() => temporizador(), 1000);
    }

}
temporizador();




//si el temporizador llega a cero usando el objeto window podremos cambiar la url y redireccionarlo a la otra pagina. OJO porque el replace me reemplaza la ultima unidad del stack y el push la agrega al final, queremos agregarla al final. 

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

/*
function flagCambio() {
    guardarTareasFinalizadas()
    //window.location.href = "/pomodoro.html";
    // Agregar al historial una entrada para que el usuario pueda volver a la página del temporizador
    //window.history.pushState(null, "", window.location.href); // Mantiene la página actual en el historial

    // Ahora reemplazar la entrada actual con la página de pomodoro
    // Primero, usamos pushState para agregar una nueva entrada al historial
    window.history.pushState(null, "", window.location.href);
        
    // Luego, navegamos a la página destino usando assign
    setTimeout(() => {
        window.location.assign("/pomodoro.html");
    }, 1000);
}
    */
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