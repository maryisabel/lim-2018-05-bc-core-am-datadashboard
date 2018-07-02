

const computeUsersStats = (users, progress, courses) => {
    let infoEstudiante = [];
    users.forEach(user=> {
    // console.log(element1);
    let idUser = user.id;
    let progressUser = progress[idUser];
    let totalPorc_Comp= 0;
    let totalE_Pres = 0;
    let totalE_Comp = 0;
    let totalL_Pres = 0;
    let totalL_Comp = 0;
    let totalQ_Pres = 0;
    let totalQ_Comp = 0;
    let totalScore = 0;
    let empty = Object.keys(progressUser).length;
    if(empty !== 0)
    {
      courses.forEach(curso => {
        if(progressUser.hasOwnProperty(curso)) {
          if(progressUser[curso].hasOwnProperty('percent')) {
            totalPorc_Comp = totalPorc_Comp+progressUser[curso].percent;
            let progressUserByCourse = progressUser[curso];
          
            Object.values(progressUserByCourse.units).forEach(unit => {
              let exercises = Object.values(unit.parts);
              exercises.forEach((part) => {
                if(part.type === "read") {
                  totalL_Comp=totalL_Comp+ part.completed;
                  totalL_Pres++;
                }
                if(part.type === "quiz") {
                  totalQ_Comp =totalQ_Comp+ part.completed;
                  totalQ_Pres++;
                  if(part.hasOwnProperty('score')){
                    totalScore =totalScore+ part.score;
                  }
                }
                if(part.type === "practice") {
                  if(part.hasOwnProperty('exercises')) {
                    Object.values(part.exercises).forEach(ejercicio => {
                      totalE_Comp =totalE_Comp+ ejercicio.completed;
                        totalE_Pres++;
                    })
                  }
                }
              })
            })
          }
        }
      })
   
      totalPorc_Comp = Math.round((totalPorc_Comp/courses.length)*100)/100;
  
    }
    //Por ahora solo hay un curso
    let usersWithStats = {
      stats : {
        name : user.name,
        percent: totalPorc_Comp,
        exercises : {
          total: totalE_Pres,
          completed: totalE_Comp,
          percent: parseInt((totalE_Comp/totalE_Pres*100).toFixed())
        },
        reads : {
          total: totalL_Pres,
          completed: totalL_Comp, 
          percent: parseInt((totalL_Comp/totalL_Pres*100).toFixed())
        },
        quizzes : {
          total: totalQ_Pres, 
          completed: totalQ_Comp,
          percent: parseInt((totalQ_Comp/totalQ_Pres*100).toFixed()),
          scoreSum: totalScore,
          scoreAvg: parseInt((totalScore/totalQ_Comp).toFixed())
        }
      }
    }
    infoEstudiante.push(usersWithStats);
    });
    return infoEstudiante;
  }
  
  const filterUsers = (users, search) => {
    let filtro = users.filter(user => 
    (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
    return filtro;//lista de usuarios con coincidencia en search
  }
  
  
  const sortUsers = (users, orderBy, orderDirection) => {
    let infoEstudianteByOrder =users;
    if(orderBy === "Nombre") {
      infoEstudianteByOrder.sort( function(a, b) {
        var A=a.stats.name.toLowerCase(), B=b.stats.name.toLowerCase()
        if (A < B) return -1
        if (A > B) return 1
     
      });
    }
    if(orderBy === "Porcentaje Completitud Total") {
      infoEstudianteByOrder.sort( function(a,b) {
        return a.stats.percent - b.stats.percent;
      });
    }
    if(orderBy === "Porcentaje ejercicios completos") {
      infoEstudianteByOrder.sort( function(a,b) {
        return a.stats.exercises.completed - b.stats.exercises.completed;
      });
    }
    if(orderBy === "Porcentaje Quizzes completos") {
      infoEstudianteByOrder.sort( function(a,b) {
        return a.stats.quizzes.completed - b.stats.quizzes.completed;
      });
    }
    if(orderBy === "Puntuacion promedio en quizzes") {
      infoEstudianteByOrder.sort( function(a,b) {
        return a.stats.quizzes.scoreSum - b.stats.quizzes.scoreSum;
      });
    }
    if(orderBy === "Porcentaje de lecturas completadas") {
      infoEstudianteByOrder.sort( function(a,b) {
        return a.stats.reads.completed - b.stats.reads.completed;
      });
    }
    if (orderDirection === "DESC") {
      infoEstudianteByOrder = infoEstudianteByOrder.reverse();
    }
  
    return infoEstudianteByOrder;//arreglo de usuarios ordenados
  }
  
  const processCohortData = (options) => {
    let users = options.cohortData.users;
    let progress = options.cohortData.progress;
    let orderBy = options.orderBy;
    let orderDirection = options.orderDirection;
    let search = options.search;
    let courses = options.cohortData.coursesIndex;
   
    let usersFiltered = filterUsers(users, search);
    let usersWithStatus = computeUsersStats(usersFiltered, progress, courses);
    let myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
    return myListOrderAndFiltered;
  }
  
  
  window.filterUsers = filterUsers;
  window.computeUsersStats = computeUsersStats;
  window.sortUsers = sortUsers;
  window.processCohortData = processCohortData;