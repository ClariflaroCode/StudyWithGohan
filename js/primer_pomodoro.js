/*

Laza's version

const reloj = document.getElementById("reloj")
let segundos = 0;

const contar = () => {
    segundos += 1;

    let minutos = Math.floor(segundos / 60);
    segundos -=  minutos * 60;
    let horas = Math.floor(minutos / 60);
    minutos -= horas * 60;

    horasMostrar = horas;
    minutosMostrar = minutos;
    segundosMostrar = segundos;

    if(horas < 10) horasMostrar = "0" + horas;
    if(minutos < 10) minutosMostrar = "0" + minutos;
    if(segundos < 10) segundosMostrar = "0" + segundos;

    reloj.innerHTML = horasMostrar + ":" + minutosMostrar + ":" + segundosMostrar;

    return setTimeout(() => contar(), 1000)
}

contar()
*/
/// CHULI'S VERSION

let reloj = document.getElementById("reloj");
let segundos = 0;
let minutos = 0; 
let horas = 0;

function contar() {
    
    segundos = segundos + 1;

    if (segundos == 60) {
        minutos = minutos + 1;
        segundos = 0;
    }
    if (minutos == 60) {
        horas = horas + 1;
        minutos = 0;
    }
    horasMostrar = horas;
    minutosMostrar = minutos;
    segundosMostrar = segundos;

    //Estética en el html

    if(horas < 10) horasMostrar = "0" + horas;
    if(minutos < 10) minutosMostrar = "0" + minutos;
    if(segundos < 10) segundosMostrar = "0" + segundos;

    reloj.innerHTML = horasMostrar + ":" + minutosMostrar + ":" + segundosMostrar;

    //el llamado a la función se hace cada 1000 milisegundos (1 segundo)
    return setTimeout(() => contar(), 1000);
}
contar();


document.getElementById("button-next").addEventListener("click", stopTimer);

function stopTimer() {

    //Guardamos el tiempo de concentración del usuario en una tarea para poder usarlo como el tiempo de los próximos pomodoros y que sean lo más personalizados y productivos posible cada uno de los bloques. 
    const tiempoConcentracion = document.getElementById("reloj").innerHTML; 
    sessionStorage.setItem("timerPomodoro", String(tiempoConcentracion));

    console.log(tiempoConcentracion);
}


function traerLista() {

    //1.Traer la lista del storage y convertirlo a formato JSON para que no sea sólo un string y poder tratarlo como un arreglo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasEnProgreso"));

    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html. 
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            document.getElementById("doing-list").innerHTML += `<li id="${i}">${tareas[i]}</li>`;
        }
    }

}

traerLista();
