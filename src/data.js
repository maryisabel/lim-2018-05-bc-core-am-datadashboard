//Bloqueo los xhr :
/*
//Llamando los datos de users.json
let xhrUsers = new XMLHttpRequest();
xhrUsers.open('GET', '/data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
xhrUsers.onload = function() {
    if (xhrUsers.status >= 200 && xhrUsers.status < 400) {
        // Success!
        let data = JSON.parse(xhrUsers.responseText);
        console.log(data);
      } else {
         // We reached our target server, but it returned an error
        console.log('Ocurrió un error');
      }
}
/*xhrUsers.onerror = function() {
    console.log('Ocurrió un error');
} */
/*
xhrUsers.send ();
console.log(xhrUsers);
*/
//Llamando los datos de progress.json
/* 
let xhrProgress = new XMLHttpRequest();
xhrProgress.open('GET', '/data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
xhrProgress.onload = function() {
    if (xhrProgress.status >= 200 && xhrProgress.status < 400) {
        // Success!
        let data = JSON.parse(xhrProgress.responseText);
        console.log(data);
      } else {
         // We reached our target server, but it returned an error
         console.log('Ocurrió un error');
      }
}
/*xhrProgress.onerror = function() {
    console.log('Ocurrió un error');
} */
/*
xhrProgress.send ();
console.log(xhrProgress);
 */

function listaCohorts (){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', '/data/cohorts.json');
    xhrCohorts.onload = function() {
        if (xhrCohorts.status >= 200 && xhrCohorts.status < 400) {
            // Success!
            let data = JSON.parse(xhrCohorts.responseText);
            data.forEach(element=> {
                let listaCohorts  = document.createElement('li');
                listaCohorts.innerHTML = element.id;
                document.getElementById('listaCohortsUl').appendChild(listaCohorts);
            });
          } else {
             // We reached our target server, but it returned an error
             //console.log('Ocurrió un error');
          }
    }
    xhrCohorts.send ();
    //console.log(xhrCohorts);
}
document.getElementById('boton1').addEventListener("click", listaCohorts);

//Voy a comentar mi xhr Cohor xq lo meti a una función
/*
//Llamando los datos de cohorts.json
let xhrCohorts = new XMLHttpRequest();
xhrCohorts.open('GET', '/data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
xhrCohorts.onload = function() {
    if (xhrCohorts.status >= 200 && xhrCohorts.status < 400) {
        // Success!
        let data = JSON.parse(xhrCohorts.responseText);
        console.log(data);
      } else {
         // We reached our target server, but it returned an error
         console.log('Ocurrió un error');
      }
}
xhrCohorts.send ();
console.log(xhrCohorts);

*/


//Primera función: Donde userWithStats es una propiedad stats.
/*
window.computeUsersStats = (users, progress, courses) => {
    let info = users.map((usersWithStats) => {
        usersWithStats.stats ={
            percent: porcentCourses(progress[usersWithStats.id],courses),
            exercises = {
                total: totalEjercicios(progress[usersWithStats.id],courses),
            },
        }
        return usersWithStats
    });
 return info   
}

function porcentCourses(progress,courses){
    let contador=0;
    courses.forEach(curso=> {
        contador =+ progress[curso].percent;
    });
    return contador 

    let lista = document.createElement('li');
    lista=contador;
    document.getElementById('listaUsuarios').appendChild(lista);

        
})

function totalEjercicios(progress,courses){
    let total = 0;
    courses.forEach(curso => {
        Object.values(progress[curso].units).forEach(units => {

        })


    })
}



const users = [

]

const progress = [

]

const courses =["intro"] */