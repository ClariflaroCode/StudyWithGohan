document.getElementById("agregar-tarea").addEventListener("click", agregarTarea);

function traerLista() {

    //1.Traer la lista del storage y convertirlo a formato JSON para que no sea sólo un string y poder tratarlo como un arreglo. 
    const tareas = JSON.parse(sessionStorage.getItem("TareasPorRealizar"));
    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html. 
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {
            document.getElementById("to-do-list").innerHTML += `<li id="${i}">${tareas[i]}</li>`;
        }
    }

}

traerLista(); //Esto se hace por si el usuario vuelve para atrás para que no se pierdan los elementos que habían en to-do list 

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
        document.getElementById("to-do-list").innerHTML = document.getElementById("to-do-list").innerHTML + `<li id="${idNuevo}">`+tareas[tareas.length-1]+"</li>"; 

        //6.Guardar cambios en el session Storage
        sessionStorage.setItem("TareasPorRealizar", JSON.stringify(tareas));    
    }
 

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