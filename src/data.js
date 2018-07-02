window.sortUsers = (users, orderBy, orderDirection) => {

  
}


//Primera función: Donde userWithStats es una propiedad stats.

window.computeUsersStats = (users, progress, courses) => {
    //console.log(users, progress, courses);
        let info = users.map(usersWithStats => {
        try {
            usersWithStats.stats ={
                percent: promCourses(progress[usersWithStats.id],courses),
                exercises : {
                    total: numberOfExercise(progress[usersWithStats.id],courses),
                    completed: completedExercise(progress[usersWithStats.id], courses),
                    percent: (completedExercise(progress[usersWithStats.id], courses) / numberOfExercise(progress[usersWithStats.id], courses)) * 100,
                },
                reads: {
                    total: totalReads(progress[usersWithStats.id], courses),
                    completed: completedReads(progress[usersWithStats.id], courses),
                    percent: (completedReads(progress[usersWithStats.id], courses) / totalReads(progress[usersWithStats.id], courses)) * 100,      
                },
                quizzes: {
                    total: totalQuizzes(progress[usersWithStats.id], courses),
                    completed: completedQuizzes(progress[usersWithStats.id], courses),
                    percent: (completedQuizzes(progress[usersWithStats.id], courses) / totalQuizzes(progress[usersWithStats.id], courses)) * 100,
                    scoreSum: scoreSum(progress[usersWithStats.id], courses),
                    scoreAvg: (scoreSum(progress[usersWithStats.id], courses) / completedQuizzes(progress[usersWithStats.id], courses)),
                  }
          
                  

            }

            return usersWithStats;
            


        } catch (error) {
            return {};        
        }
        })
         console.log(info);
     return info; 
    }
    
    function promCourses(progress,courses){
        let contador=0;
        courses.forEach(curso=> {
            contador =+ progress[curso].percent;
        });
        return contador / courses.length;    
    }
    //funciones ejercicios, total por curso, completados por alumna y FALTA porcentaje de completados por alumna
    function numberOfExercise(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let exercises = Object.values(unit.parts).filter(ejercicio => ejercicio.hasOwnProperty("exercises"));
            exercises.forEach((parte) => {
              total += Object.values(parte.exercises).length;
            })
          })
        })
        return total;
      }
      
      function completedExercise(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let partes = Object.values(unit.parts).filter(ejercicio => ejercicio.hasOwnProperty("exercises"));
            partes.forEach((parte) => {
              let completeExercices = Object.values(parte.exercises).filter(
                (exercise) => {
                  return exercise.completado === 1;
                })
              total += completeExercices.length;
            })
          })
        })
        return total;
      }
      
      function totalReads(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let reads = Object.values(unit.parts).filter(lectura => lectura.hasOwnProperty("type") && lectura.type === "read"); //al no poner llaves se retorna automaticamente la primera linea
            total += reads.length
          })
        })
        return total;
      }
      
      function completedReads(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let lecturas = Object.values(unit.parts).filter(lectura => lectura.type === "read");
            let onlyReads = lecturas.filter((lectura) => lectura.completed === 1)
            total += onlyReads.length;
          })
        })
        return total;
      }
      
      function totalQuizzes(progress, courses) {
        let total = 0;
        Object.entries(progress).forEach(([nombre, curso]) => {
          if (courses.indexOf(nombre) >= 0) {
            Object.values(curso.units).forEach((unit) => {
              let quiz = Object.values(unit.parts).filter((part) => part.type === "quiz")
              total += quiz.length;
            })
          }
        })
        return total;
      }
      
      function completedQuizzes(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let quizzes = Object.values(unit.parts).filter(quiz => quiz.type === "quiz");
            let onlyQuizzes = quizzes.filter((quiz) => quiz.completed === 1)
            total += onlyQuizzes.length;
          })
        })
        return total;
      }
      //Suma de todas las puntuaciones (score) de los quizzes completados.
      function scoreSum(progress, courses) {
        let total = 0;
        courses.forEach(curso => {
          Object.values(progress[curso].units).forEach(unit => {
            let quizzes = Object.values(unit.parts).filter((part) => part.type === "quiz" && part.completed === 1)
            quizzes.forEach(quiz => {
              total += quiz.score
            })
          })
        })
        return total
      }
      
      
      
      

  //console.log(listUsers.innerText= getInfoData());

  //var jsontext = '{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}';
//var contact = JSON.parse(usersPrecore);
//document.write(contact.id);

// Output:
// Aaberg, Jesper
// 555-0100
  
 // console.log(listUsers.innerHTML= JSON.stringify(getInfoData()));

 // document.getElementById("mostrar").addEventListener('click', (e) => {
  //  e.preventDefault();
  //document.getElementsByTagName("mytable").innerHTML= JSON.stringify(getInfoData());
  //var cars = ["Saab", "Volvo", "BMW"];
 // document.getElementById("mytable").innerHTML = usersWithStats.values;
  //document.getElementById("mytable").innerHTML =document.querySelectorAll(getInfoData().values);

//});

// Hasta aquí termina la primera función
      /////////////////////////////////////////////////////////////////////////////////////
      //Tecera función filterUsers:

      /* window.filterUsers()

      window.filterUsers = (users, search) => {
        //console.log(users, progress, courses);
            let info = users.map(usersWithStats => {
            } */

            //document.getElementById('listaCohortsUl').appendChild(listaCohorts); es un ejemplo