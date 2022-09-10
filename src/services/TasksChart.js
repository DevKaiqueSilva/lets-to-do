export default (tasks) => {
  let chart = [];
  try{
    if(tasks.length > 0){
      // TASKS
      let tasksCreated = tasks.filter(t=>(!!t.createdAt)).map(t=>({createdAt: t.createdAt.substring(0,10)}));
      let tasksCompleted = tasks.filter(t=>(!!t.completedDate)).map(t=>({completedDate: t.completedDate.substring(0,10)}));
      // DATES
      let datesCreated = tasksCreated.map(t=>(t.createdAt.substring(0,10)));
      let datesCompleted = tasksCompleted.map(t=>(t.completedDate.substring(0,10)));
      let dates = (datesCreated.concat(datesCompleted));
      let datesUnique = dates.filter((d, i, self)=>(self.findIndex(s=>(s == d)) == i));
      console.log(datesUnique);
      // CHART
      chart = datesUnique.map(d=>({
        date: d,
        qtdCreated: tasksCreated.filter(t=>(t.createdAt == d)).length,
        qtdCompleted: tasksCompleted.filter(t=>(t.completedDate == d)).length
      }));
      // ORDER BY date
      chart.sort((a,b) => ( new Date(a.date) - new Date(b.date) ));
    }
  }catch(err){
    console.log("Fail on create chart: ", err);
  }
  return chart;
}