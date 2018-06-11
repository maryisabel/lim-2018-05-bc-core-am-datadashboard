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
xhrUsers.send ();
console.log(xhrUsers);

//Llamando los datos de progress.json
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
xhrProgress.send ();
console.log(xhrProgress);

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
/*xhrCohorts.onerror = function() {
    console.log('Ocurrió un error');
} */
xhrCohorts.send ();
console.log(xhrCohorts);


