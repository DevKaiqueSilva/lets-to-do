import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {},
    lists: [
      {
        id: 1,
        title: "Projeto 'To do!'",
        show: true,
        tasks: [
          { 
            id: 1,
            title: "Criar página de login",
            completed: false,
            planned: null,
            favorite: false,
            priority: 1,
            description: "Desenvolver formulário de acesso, utilizando API mockada."
          }
        ]
      }
    ]
  },
  getters: {
    snackbar(state){ 
      return state.snackbar
    },
    lists(state){
      return state.lists
    }
  },
  mutations: {
    setSnackbar(state, snackbar){
      state.snackbar = snackbar;
    },
    setLists(state, lists){
      state.lists = lists;
    }
  },
  actions: {
    setSnackbar(context, snackbar){
      context.commit("setSnackbar", snackbar);
    }
  }
});
