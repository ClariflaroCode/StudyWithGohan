const cantidadPomos = sessionStorage.getItem("CantidadDePomodoros");
numeroDePomodoros = Number(cantidadPomos);
numeroDePomodoros++;
sessionStorage.setItem("CantidadDePomodoros", String(numeroDePomodoros));

let reloj = document.getElementById("reloj");

let timer= sessionStorage.getItem("timerPomodoro");
const miArray = timer.split(":");

let segundos = Number(miArray[2]);
let minutos = Number(miArray[1]); 
let horas = Number(miArray[0]);

let flag = false;


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
        return setTimeout(temporizador, 1000);
    }

}
temporizador();

function traerListaDoing() {

    //1.Traer la lista del storage y convertirlo a formato JSON para que no sea sólo un string y poder tratarlo como un arreglo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasEnProgreso"));

    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html. 
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            document.getElementById("doing-list").innerHTML += `<li id="${i}">${tareas[i]}</li>`;
        }
    }

}
traerListaDoing();

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
    window.location.assign("fin.html");
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