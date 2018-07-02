//Mostrar los cohorts en lista para que el usuario seleccione
document.getElementById("Resultados").style.display = "none";
changeSede();
document.getElementById('sede').addEventListener("onchange", changeSede);
function changeSede() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    let selectorSede = document.getElementById('sede');
    let sedeName = selectorSede.options[selectorSede.selectedIndex].value;
    let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(sedeName.toUpperCase()) !== -1);
    document.getElementById("selectCohort").innerHTML = "";
    cohortByCampus.forEach(function(element) {
    let nameOfCohort = document.createElement('option');
    nameOfCohort.innerText = element.id;
    let selectCohort = document.getElementById('selectCohort');
    selectCohort.appendChild(nameOfCohort);
    })
  });
}
//Evento para el boton una vez que el usuario seleccione cohort
var chargeAll = document.getElementById('btnMostrar');
chargeAll.addEventListener("click", beginApp);
var chargeSearch = document.getElementById('searchName');
chargeSearch.addEventListener("input", beginApp);
//funcion para convertir propiedades del objeto en array
// object.hasOwnProperty to know if exists the property
function beginApp() {
  document.getElementById("contenido").style.display = "none";
  document.getElementById("Resultados").style.display = "block";
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    //selector
    let selectorSede = document.getElementById('sede');
    let sedeName = selectorSede.options[selectorSede.selectedIndex].value;
    let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(sedeName.toUpperCase()) !== -1);
    let selector = document.getElementById('selectCohort');
    let cohortName = cohortByCampus[selector.selectedIndex].id;
    // console.log(cohortName);
    let jsonFile = "https://api.laboratoria.la/cohorts/" + cohortName + "/users";
    fetch(jsonFile)
    .then((response) => {return response.json();})
    .then((users) => {
      jsonFile = "https://api.laboratoria.la/cohorts/"+ cohortName +"/progress";
      fetch(jsonFile)
      .then((response) => {return response.json();})
      .then((progress)=> {
        //ordenar por tema
        let ordenar1 = document.getElementById('orderBy');
        let orderBy = ordenar1.options[ordenar1.selectedIndex].text;
        //ordenar por direccion
        let ordenar2 = document.getElementById('orderDirection');
        let orderDirection = ordenar2.options[ordenar2.selectedIndex].text;
        //buscador
        let search = document.getElementById('searchName').value;
        var options = {
          cohort: cohortByCampus[selector.selectedIndex],
          cohortData : {
            users,//array en bruto users
            progress,//objeto en bruto progress
            coursesIndex : Object.keys(cohortByCampus[selector.selectedIndex].coursesIndex)//arreglo
          },
          orderBy,
          orderDirection,
          search
        }
        // console.log(cohortByCampus[selector.selectedIndex].coursesIndex);
        let myFinalList = window.processCohortData(options);
        let tablaEstudiantes = document.getElementById("tablaEstudiantes");
        tablaEstudiantes.innerHTML="";
        tablaEstudiantes.innerHTML="<tr><td>Nombre</td><td>Porcentaje</td><td>Ejercicios</td><td>Quizzes</td><td>Lecturas</td><td>Prom Quiz</td></tr>";

        tablaEstudiantes.appendChild(document.createElement('tr'));
        let count = 1;
        // console.log("div"+count)
        myFinalList.forEach(function(element) {
        let fileStudent = document.createElement('tr');
        fileStudent.setAttribute("id", "student" + count);
        let nameOfStudents = document.createElement('td');
        nameOfStudents.innerText = element.stats.name;
        let percentStudent = document.createElement('td');
        percentStudent.innerText = element.stats.percent + "%";
        let exercisesStudent = document.createElement('td');
        exercisesStudent.innerText = element.stats.exercises.completed + " de " +element.stats.exercises.total;
        let quizzesStudent = document.createElement('td');
        quizzesStudent.innerText = element.stats.quizzes.completed + " de " +element.stats.quizzes.total;
        let readsStudent = document.createElement('td');
        readsStudent.innerText = element.stats.reads.completed + " de " +element.stats.reads.total;
        let quizzesPromStudent = document.createElement('td');
        quizzesPromStudent.innerText = element.stats.quizzes.scoreSum;
        tablaEstudiantes.appendChild(nameOfStudents);
        tablaEstudiantes.appendChild(percentStudent);
        tablaEstudiantes.appendChild(exercisesStudent);
        tablaEstudiantes.appendChild(quizzesStudent);
        tablaEstudiantes.appendChild(readsStudent);
        tablaEstudiantes.appendChild(quizzesPromStudent);
        count++;
        tablaEstudiantes.appendChild(document.createElement('tr'));
        });
      });
    });
  });
}