function traerLista() {

    //1. Traer lista de tareas
    const tareas = JSON.parse(sessionStorage.getItem("TareasPorRealizar"));

    //2. Si existe una lista, recorrerla y mostrar el contenido de cada celda como un list item en el html y al lado un checkbox
    if (tareas != null) {
        for (let i = 0; i < tareas.length; i++) {

            //3. Crear el id del checkbox
            let identificadorCheck = "checkbox" + i;

            document.getElementById("to-do-list").innerHTML += `<div class="list-item-checkbox"> <li id="${i}">${tareas[i]}</li><input class="tomaste-tarea" type="checkbox" id="${identificadorCheck}"> </div>`;

        }
    }

}
traerLista();


document.getElementById("button-next").addEventListener("click", seleccionarTareas); //una vez que el usuario presiona en el botón "start" ahí debe activarse el evento para conocer todas las tareas que seleccionó para hacer en el pomodoro. 

function seleccionarTareas() {

        //1. Traer lista de tareas
        const tareasPorHacer = JSON.parse(sessionStorage.getItem("TareasPorRealizar"));

        //2. Queremos traer la lista de tareas haciendose y actualizarla. Si no tiene nada, la creamos vacía. 
        const tareasHaciendose = JSON.parse(sessionStorage.getItem("TareasEnProgreso")) || [];

        //3. Queremos saber si hay tareas y si hay tareas, queremos ver cuales fueron seleccionadas. 
        if (tareasPorHacer != null) {

            for (let i = tareasPorHacer.length-1; i >= 0; i--) {

                //4. Crear el id del checkbox
                let identificadorCheck = "checkbox" + i;
                //5.Verificaremos si está chequeado el campo, o sea, si se tomó la tarea. 
                let checkbox = document.getElementById(identificadorCheck);

                if (checkbox != null && checkbox.checked) {

                    //6. Agregamos la tarea al arreglo dinámico/lista de tareasHaciendose. 
                    tareasHaciendose.push(tareasPorHacer[i]);
                    //7. Eliminamos la tarea del arreglo dinámico de tareas (por hacer)
                    tareasPorHacer.splice(i,1); //splice es un método de arreglo que realiza un corrimiento a partir de la posicion que indique el primer parámetro y la cantidad de veces que lo indique el segundo. El corrimiento pisa los elementos deseados a partir de la posicion i reacomodando los elementos posteriores. El corrimiento es a izquierda, porque el bloque grande de elementos sigue la norma de "donde estoy se vuelve el posterior" creando la ilusión de un movimiento a izquierda. Javascript se encargará de que los n elementos duplicados que queden al final determinados por el segundo parámetro no sean considerados reduciendo la longitud del arreglo esa n cantidad de veces. OJO, que como hace esto, tenemos que recorrer en sentido inverso el arreglo para no tener errores de indices. 

                }
            }

        //8. Como no van a cambiar si no hay tareas por hacer, es más eficiente que esté acá la actualización de los cambios de los arreglos en el storage. Primero guardaremos los cambios de tareas por hacer:
        sessionStorage.setItem("TareasPorRealizar", JSON.stringify(tareasPorHacer));
        //9. Debemos invertir el orden del arreglo, porque las tareas se agregaron en el orden inverso al que se mostraban. 
        tareasHaciendose.reverse();
        //10. Guardamos los cambios de las tareas en progreso
        sessionStorage.setItem("TareasEnProgreso", JSON.stringify(tareasHaciendose));   

        }
    
}