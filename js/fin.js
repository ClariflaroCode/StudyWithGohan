let tiempoPomodoro= sessionStorage.getItem("timerPomodoro");
document.getElementById("tiempo-pomodoro").innerHTML = tiempoPomodoro;

let tiempoRecreo = sessionStorage.getItem("timerRecreo");
document.getElementById("tiempo-recreo").innerHTML = tiempoRecreo;


function traerLista() {

    //1.Traer la lista del storage y convertirlo a formato JSON para que no sea sólo un string y poder tratarlo como un arreglo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasFinalizadas"));

    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html. 
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            document.getElementById("done-list").innerHTML += `<li id="${i}">${tareas[i]}</li>`;
        }
    }

}

traerLista();

function calcularTiempoTotal(bloque) {
    //1.Declaro las variables
    let timer = 0;
    let cantidadPomos = 0;
    let numeroTotal = 0;
    let id = 0;

    //2.A partir de quien llama pido los datos que correspondan
    if (bloque === "pomodoros") {
        cantidadPomos = sessionStorage.getItem("CantidadDePomodoros");
        numeroTotal = Number(cantidadPomos);
        id = "tiempo-total-pomodoros";
        timer = sessionStorage.getItem("timerPomodoro");
    } 
    if (bloque == "recreos") {
        cantidadRecreos = sessionStorage.getItem("CantidadDeRecreos");
        numeroTotal= Number(cantidadRecreos);
        id = "tiempo-total-recreos";
        timer = sessionStorage.getItem("timerRecreo");
    }

    //3.Separo el string tomado del session storage cortando donde tenga ":" y con eso formo un arreglo para extraer los valores. 
    const myArray = timer.split(":");

    //4. multiplico los tiempos por la cantidad de pomodoros /recreos tomados y corrijo rebalses. 
    let segundos =  Number(myArray[2]) * numeroTotal;
    let minutos_creados = Math.floor(segundos /60);
    segundos = segundos - (minutos_creados * 60);

    let minutos = (Number(myArray[1]) * numeroTotal) + minutos_creados;
    let horas_creadas = Math.floor(minutos / 60);
    minutos =  minutos - (horas_creadas * 60);

    let horas = (Number(myArray[0]) * numeroTotal) + horas_creadas;

    let segundosAMostrar = segundos.toString();
    let minutosAMostrar = minutos.toString();
    let horasAMostrar = horas.toString();

    if (segundos < 10) { 
        segundosAMostrar = "0" + segundos; //no es necesario agregarel toString porque javascript castea favoreciendo al string si se opera con él y otro tipo. 
    }
    if (minutos < 10) {
        minutosAMostrar = "0" + minutos;
    }
    if(horas < 10) {
        horasAMostrar = "0" + horas;
    }
    
    document.getElementById(id).innerHTML = horasAMostrar + ":" + minutosAMostrar + ":" + segundosAMostrar; 
}
calcularTiempoTotal("pomodoros");
calcularTiempoTotal("recreos");




function actualizarFecha() {
    const currentDate = new Date();

    const dia = currentDate.getDate();
    const mes = currentDate.getMonth() + 1; 
    const yearActual = currentDate.getFullYear();

    const fecha = dia.toString() + "/"+ mes.toString() +"/" + yearActual.toString();

    document.getElementById("fecha-actual").innerHTML = fecha;
}
actualizarFecha();