<template>
  <v-navigation-drawer absolute permanent color="color1" dark app>
    <template v-slot:prepend>
      <div class="title-logo">Let's Do It!</div>
      <v-divider></v-divider>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://www.w3schools.com/w3images/avatar2.png">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Kaique Silva</v-list-item-title>
          <v-list-item-subtitle>
            <v-progress-linear 
              class="mt-2" color="green" height="15" style="border-radius: 5px"
              :value="(allTasks.filter(t=>(t.completed)).length/allTasks.length)*100"
            />
          </v-list-item-subtitle>
        </v-list-item-content>
        <!-- <v-list-item-action>
          <v-btn icon small>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </v-list-item-action> -->
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list dense class="px-1">
      <v-list-item
        v-for="(item,i) in options"
        :key="`opt-${i}`" :class="item.show ? 'list-selected' : ''"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          {{item.qtd}}
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense class="pa-1 mt-1">
      <v-list-item
        v-for="(item,i) in lists"
        :key="`opt-${i}`"
        :class="item.show ? 'list-selected' : ''"
      >
        <v-list-item-icon>
          <v-icon class="mt-2">mdi-order-bool-ascending-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-progress-linear :value="(item.tasks.filter(t=>(t.completed)).length/item.tasks.length)*100" :height="10" color="green" class="mt-1"/>
        </v-list-item-content>
        <v-list-item-action class="body-2">
          {{item.tasks.filter(t=>(t.completed)).length}}/{{item.tasks.length}}
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!-- <div class="pa-1">
      <v-btn block outlined>
        <v-icon class="mr-2">mdi-plus</v-icon>NOVA LISTA
      </v-btn>
    </div> -->
  </v-navigation-drawer>
</template>

<script>
export default {
  data(){
    return{
      filterIndex: 0
    }
  },
  computed: {
    options(){
      return [
        { icon: "mdi-apps", title: "Todos", qtd: this.allTasks.length },
        { icon: "mdi-star", title: "Importantes", qtd: this.allTasks.filter(t=>(t.favorite)).length },
        { icon: "mdi-calendar", title: "Agendados", qtd: this.allTasks.filter(t=>(!!t.planned)).length },
        { icon: "mdi-clock-time-five-outline", title: "Pendentes", qtd: this.allTasks.filter(t=>(t.completed==false)).length },
        { icon: "mdi-check-circle", title: "Completos", qtd: this.allTasks.filter(t=>(t.completed == true)).length }
      ].map((o,i)=>({
        ...o,
        show: this.filterIndex == i
      }));
    },
    allTasks(){
      let tasks = [];
      if(this.lists.length > 0){
        this.lists.forEach(l=>{
          if(l.tasks.length > 0){
            tasks = tasks.concat(l.tasks);
          }
        });
      }
      return tasks;
    },
    lists(){
      return this.$store.getters["lists"];
    }
  }
}
</script>

<style lang="sass" scoped>
.title-logo
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
  color: var(--v-color3-base)
  font-size: 2.5rem
  -webkit-text-stroke: 1px white
  text-align: center
.list-selected
  background-color: var(--v-color2-base) !important
  border-radius: 5px
</style>