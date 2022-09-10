import Vue from 'vue';
import Vuex from 'vuex';
import ListTasksExample from '@/assets/json/ListTasksExample.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {},
    lists: ListTasksExample,
    filterIndex: 0
  },
  getters: {
    snackbar(state){ 
      return state.snackbar
    },
    lists(state){
      return state.lists
    },
    listsFiltered(state){
      return state.lists.filter(l=>(l.show)).map(l=>({
        ...l,
        tasks: l.tasks.filter(t=>{
          if(state.filterIndex == 0) return t;
          else if(state.filterIndex == 1) return t.favorite == true;
          else if(state.filterIndex == 2) return !!t.planned;
          else if(state.filterIndex == 3) return t.completed == false;
          else return t.completed == true;
        })
      }));
    },
    filterIndex(state){
      return state.filterIndex;
    }
  },
  mutations: {
    setSnackbar(state, snackbar){
      state.snackbar = snackbar;
    },
    setLists(state, lists){
      state.lists = lists;
    },
    addList(state, nList){
      console.log(nList);
      state.lists.push(nList);
    },
    addTask(state, task){
      let indexL = state.lists.findIndex(l=>(l.id == task.listId));
      console.log(indexL, task);
      if(indexL >= 0){
        if(task.id == null){
          task.id = state.lists[indexL].tasks.length + 1;
          state.lists[indexL].tasks.push(task);
        }else{
          let indexT = state.lists[indexL].tasks.findIndex(t=>(t.id == task.id));
          console.log(indexT);
          if(indexT >= 0) state.lists[indexL].tasks.splice(indexT, 1, task);
        }
      }
    },
    deleteTask(state, { task, listIndex }){
      state.lists[listIndex].tasks = state.lists[listIndex].tasks.filter(t=>(t.id != task.id));
    },
    deleteList(state, { list, index }){
      state.lists.splice(index, 1);
    },
    changeListTitle(state, { id, title }){
      let indexL = state.lists.findIndex(l=>(l.id == id));
      if(indexL >= 0) state.lists[indexL].title = title;
    },
    showList(state, indexL){
      state.lists[indexL].show = !state.lists[indexL].show;
    },
    setFilterIndex(state, index){
      state.filterIndex = index;
    }
  },
  actions: {
    setSnackbar(context, snackbar){
      context.commit("setSnackbar", snackbar);
    },
    addList(context, nList){
      nList.show = true;
      nList.tasks = [];
      context.commit("addList", nList);
    },
    saveTask(context, task){
      context.commit("addTask", task);
    },
    deleteTask(context, { task, listIndex }){
      context.commit("deleteTask", { task, listIndex });
    },
    deleteList(context, { list, index }){
      context.commit("deleteList", { list, index });
    },
    changeListTitle(context, { id, title }){
      context.commit("changeListTitle", { id, title });
    },
    showList(context, indexL){
      context.commit("showList", indexL);
    },
    setFilterIndex(context, index){
      context.commit("setFilterIndex", index);
    }
  }
});
