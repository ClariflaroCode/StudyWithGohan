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