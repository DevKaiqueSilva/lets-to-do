import { shallowMount } from '@vue/test-utils';
import TasksChart from "../../src/services/TasksChart";
import ListTasksExample from "../../src/assets/json/ListTasksExample.json";

describe('Chart', () => {
  test('Verify Function Tasks Chart', () => {
    let tasks = ListTasksExample;
    let allTasks = [];
    if(tasks && tasks.length>0){
      tasks.forEach(t=>{
        allTasks = allTasks.concat(t.tasks);
      });
    }
    let chart = TasksChart(allTasks);
    expect(chart.length).toEqual(2);
  });
});
