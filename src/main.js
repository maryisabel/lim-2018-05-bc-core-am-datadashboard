//CON TABLA


//Variables para jalar data
const allCohortsURL = '../data/cohorts.json';
const allCohorts = [];
const allUsers = [];
const allProgress = [];
const usersPrecore = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressUsers = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
//Variables
//const listUsers = document.getElementById('mytable');
const listUsers = document.getElementById('nomEstudiantes');
//const listProgress = document.getElementById('listProgress');
const listProgress = document.getElementById('containerListProgress');
const selectCohorts = document.getElementById('selectorOfCohorts');
//variables de los botones
const cohortsBtn = document.getElementById('btnCohorts');
const titleListStudent = document.getElementById('titleListStudent');
const containerListStudents = document.getElementById('listStudents');
const btnSearch = document.getElementById('Search');
let searchName = document.getElementById('searchName');
const lima2018 = document.getElementById('lim-2018-03-pre-core-pw');
const btnOrdenar = document.getElementById('Ordenar');

window.onload = () => {
  ListOfCohorts();
}

/*selectCohorts.addEventListener('change', evt => {

  console.log(evt.target.value);

  //console.log(getInfoData());
  //listUsers.innerHTML = getInfoData();

var found = allCohorts.find(function(cohort) {
  return cohort.id===evt.target.value;
});

console.log(found);
console.log(found.coursesIndex);
console.log(Object.keys(found));
console.log(Object.keys(found.coursesIndex));

const data = getInfoData(found.coursesIndex);
console.log(data);
})*/

//const courses = ["intro"];
//const getInfoData = (courses) => {
  const courses = ["intro"];
  const getInfoData = () => {
  
  fetch("../data/cohorts/lim-2018-03-pre-core-pw/users.json", { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }

      return response.json();
    })
    .then((users) => {
      fetch("../data/cohorts/lim-2018-03-pre-core-pw/progress.json", { method: 'GET' })
        .then((response) => {
          if (response.status !== 200) {
            alert('Error')
          }
          return response.json();
        })
        .then((progress) => {
          return computeUsersStats(users, progress, courses);
        })
    })
};


lima2018.addEventListener('click', (e) => {

  e.preventDefault();


  JSON.parse(getInfoData()) = listUsers.innerHTML;

  console.log(getInfoData())


});


//Evento del selector que crea la lista de las alumnas
selectCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    NameUsersCohort(selectCohorts.value);
    containerListStudents.classList.remove('hidden');
    titleListStudent.classList.remove('hidden');
    document.getElementById("contenido").style.display = "none";
    document.getElementById("listStudents").style.display = "block";
    //selectCohorts.classList.remove('hidden');
    
   ListOfCohorts();
}); 


//Evento del selector que crea la lista de las alumnas
/* selectCohorts.addEventListener('click', (e) => {
  e.preventDefault();
  NameUsersCohort(selectCohorts.value);
  containerListStudents.classList.remove('hidden');
  titleListStudent.classList.remove('hidden');
  document.getElementById("contenido").style.display = "none";
  document.getElementById("listStudents").style.display = "block";
  selectCohorts.classList.remove('hidden');

  ListOfCohorts();
}); */


//Mostrando lista de cohorts en el select:
const ListOfCohorts = () => {
  fetch(allCohortsURL, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((responseCohorts) => {
      
      responseCohorts.forEach(cohort => {
        allCohorts.push(cohort);
        let cohortName = document.createElement('option');
        cohortName.value = cohort.id;
        cohortName.innerText = cohort.id;
        selectCohorts.appendChild(cohortName);
      })
    })
}
//Dandole funcionalidad al cohort para q muestre los estudiantes
const NameUsersCohort = (cohortName) => {
  let arrayUsersCohort = [];
  fetch(usersPrecore, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((responseCohort) => {
      responseCohort.forEach(user => {
        if (user.signupCohort === cohortName) {
          arrayUsersCohort.push(user);
        }
      });
      paintUsersFromCohort(arrayUsersCohort);
    })
};
//Muestra la lista de las estudiantes, pero los nombres tienen enlace
const paintUsersFromCohort = (arrayUsersCohort) => {
  listUsers.innerHTML = '';
  arrayUsersCohort.forEach(user => {
    let createElement = document.createElement('tr');
    let createElement_A = document.createElement('a');
    createElement_A.innerHTML = user.name,
      createElement_A.setAttribute('href', 'javascript;');
    createElement_A.addEventListener('click', (e) => {
      e.preventDefault();
      getUsersProgress(user.id);
    });
    createElement.appendChild(createElement_A);
    listUsers.appendChild(createElement);
  });
}

//evento del texto al filtrar estudiante
searchName.addEventListener('input', (e) => {
  console.log(e.target.value);
  //e.preventDefault();

  //searchStudent(array, e.target.value); ...
  
  filterUsers(searchName.value);
});

//Buscar estudiantes por su nombre
//const searchStudent = (string,student) => {
  //const searchStudent = (arrayNameUser, student) => {
    const filterUsers = (student) => {
  let arrayNameUser = [];
  //console.log(arrayNameUser + "arraynameuserinicial");
  fetch(usersPrecore, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((dataOfUsers) => {
      dataOfUsers.forEach(user => { // recorrer la data
       if ((user.name.toUpperCase()).indexOf(student.toUpperCase())!==-1) {
        
         //for (let i= 0; i<student.length; i++){
           //let user= student[i];
          arrayNameUser.push(user); //adicionar elemento al array
      
        }
      });
      paintUsersFromCohort(arrayNameUser);
    })
  
};

//Relacionarlo con el progreso del estudiante
const getUsersProgress = (idStudent) => {
  fetch(progressUsers, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((progressStudent) => {
      let progressUser = progressStudent[idStudent]["intro"]["percent"];
      createContainerForScore(progressUser);
      console.log(progressUser);
      document.getElementById("listStudents").style.display = "none";
      document.getElementById("ProgressStudent").style.display = "block";
    })
};
const createContainerForScore = (scoreForStudent) => {
  listProgress.innerHTML = "";
  let createElement_Li = document.createElement('li');
  createElement_Li.innerText = scoreForStudent;
  let createElementP = document.createElement('p');
  createElementP.innerText = "Porcentaje de completidud de todos los cursos";
  listProgress.appendChild(createElementP);
  listProgress.appendChild(createElement_Li);

}


btnOrdenar.addEventListener('click', (e) => {

  e.preventDefault();
  NameUsersCohort(selectCohorts.value);
  containerListStudents.classList.remove('hidden');
  titleListStudent.classList.remove('hidden');
  document.getElementById("contenido").style.display = "none";
  document.getElementById("listStudents").style.display = "block";
  selectCohorts.classList.remove('hidden');

  ListOfCohorts().sort() = listUsers.innerHTML;
  console.log(ListOfCohorts())



  /*
  // Ordenamiento por nombre, ascendente
  productos.sort(function(a, b){
    return a.nombre.localeCompare(b.nombre);
  });
  console.log(productos);
   
  // Ordenamiento por nombre, descendente
  productos.sort(function(a, b){
    return b.nombre.localeCompare(a.nombre);
  });
  console.log(productos);
   
  // Ordenamiento por id, ascendente
  productos.sort(function (a, b) {
    return a.id - b.id;
  });
  console.log(productos);
   
  // Ordenamiento por id, descendente
  productos.sort(function (a, b) {
    return b.id - a.id;
  });
  console.log(productos);
  */


}); 