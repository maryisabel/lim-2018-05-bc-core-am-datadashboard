//Variables para jalar data
const allCohorts = '../data/cohorts.json';
const usersPrecore = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressUsers = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
//Variables
const listUsers = document.getElementById('nomEstudiantes');
const listProgress = document.getElementById('listProgress');
const selectCohorts = document.getElementById('selectorOfCohorts');
//variables de los botones
const cohortsBtn = document.getElementById('btnCohorts');
const titleListStudent = document.getElementById('titleListStudent');
const containerListStudents = document.getElementById('listStudents');
const btnSearch = document.getElementById('Search'); 
let searchName = document.getElementById('searchName');
//Evento del boton cohorts, para q liste todos los Cohorts
/* cohortsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectCohorts.classList.remove('hidden');

    ListOfCohorts();
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
    
   //ListOfCohorts();
}); */
//Evento del boton buscar estudiante
/*btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchStudent(searchName.value);
});*/
//Evento del selector que crea la lista de las alumnas
selectCohorts.addEventListener('click', (e) => {
  e.preventDefault();
  NameUsersCohort(selectCohorts.value);
  containerListStudents.classList.remove('hidden');
  titleListStudent.classList.remove('hidden');
  document.getElementById("contenido").style.display = "none";
  document.getElementById("listStudents").style.display = "block";
  selectCohorts.classList.remove('hidden');
 
 ListOfCohorts();
});

//evento del texto al filtrar estudiante
searchName.addEventListener('keyup', (e) => {
  e.preventDefault();
  searchStudent(searchName.value);
});

//
//
//
//Mostrando lista de cohorts en el select:
const ListOfCohorts = () => {
    fetch(allCohorts, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
      })
   .then((responseCohorts) => {
      responseCohorts.forEach(cohort => {
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
      createElement_A.addEventListener('click', (e)=>{
        e.preventDefault();
        getUsersProgress(user.id);
      });
      createElement.appendChild(createElement_A);
      listUsers.appendChild(createElement);
      });
  }
  //Buscar estudiantes por su nombre
  const searchStudent = (student) => {
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
        //console.log(dataOfUsers + "dataofuser en then")
        dataOfUsers.forEach(user => { // recorrer la data
          //console.log(dataOfUsers.forEach + "dataofuser en foreach")
          if (user.name === student) {
            arrayNameUser.push(user); //adicionar elemento al array
            //console.log(arrayNameUser.push(user) +"arraynameuser.push(user)")
          }
        });
        paintUsersFromCohort(arrayNameUser);
        //console.log( paintUsersFromCohort(arrayNameUser)+" paintUsersFromCohort(arrayNameUser)")
      })
  };
  