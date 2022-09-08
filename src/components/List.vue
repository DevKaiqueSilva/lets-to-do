<template>
  <v-flex xs12 class="pa-2">
    <v-layout align-center class="mb-2">
      <h2 class="ml-2">{{list.title}}</h2>
      <v-spacer/>
      <div style="min-width:250px">
        <div class="text-right">{{tasksCompleted}}/{{list.tasks.length}}</div>
        <v-progress-linear :value="(tasksCompleted/list.tasks.length) * 100" height="20" color="green"></v-progress-linear>
      </div>
    </v-layout>
    <v-layout wrap>
      <v-flex v-for="(task, i) in list.tasks" :key="`task-${i}`" xs12 md6 class="pa-1">
        <Task :task="task" />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Task from './Task.vue';
export default {
    props: {
      list: {
        type: Object,
        required: true
      }
    },
    components: { Task },
    computed: {
      tasksCompleted() {
        return this.list.tasks.filter(t => (t.completed)).length;
      }
    }
}
</script>