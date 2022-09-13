<template>
  <v-flex xs12 class="pa-2">
    <v-layout align-center class="mb-2" :wrap="$vuetify.breakpoint.smAndDown">
      <v-flex xs12 md9>
        <v-layout align-center>
          <h2 class="ml-2 mr-2">{{list.title}}</h2>
          <v-spacer v-if="$vuetify.breakpoint.smAndDown"/>
          <v-btn icon small class="mx-2" @click="onEditList">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small class="mx-2" @click="$emit('deleteList')">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
      <v-spacer/>
      <v-flex xs12 md3 style="min-width:250px">
        <div class="text-right">{{tasksCompleted}}/{{list.tasks.length}}</div>
        <v-progress-linear :value="(tasksCompleted/list.tasks.length) * 100" height="20" color="green"></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex
        v-for="(task, i) in list.tasks" :key="`task-${i}`"
        xs12 md6 xl4 class="pa-1"
      >
        <Task
          :task="task" :list="list"
          @edit="$emit('editTask', task)"
          @delete="$emit('deleteTask', task)"
        />
      </v-flex>
    </v-layout>
    <v-dialog v-model="showEdit" persistent max-width="350">
      <v-card class="pa-3" color="color1" dark>
      <v-text-field v-model="listEdit" outlined dense hide-details />
      <v-divider class="my-3"/>
      <v-layout>
        <v-flex xs6>
          <v-btn height="40" text @click="showEdit=false" block>
            CANCELAR
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn height="40" color="color3" @click="onSaveEditList" block>
            CONFIRMAR
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import Task from './Task.vue';

export default {
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listEdit: '',
      showEdit: false,
    };
  },
  components: { Task },
  methods: {
    onSaveEditList() {
      this.$store.dispatch('changeListTitle', { id: this.list.id, title: this.listEdit });
      this.showEdit = false;
    },
    onEditList() {
      this.listEdit = this.list.title;
      this.showEdit = true;
    },
  },
  computed: {
    tasksCompleted() {
      return this.list.tasks.filter((t) => (t.completed)).length;
    },
  },
};
</script>
