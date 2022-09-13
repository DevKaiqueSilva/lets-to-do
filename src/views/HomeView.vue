<template>
  <v-flex xs12 style="height: 100%">
    <NavBar v-if="$vuetify.breakpoint.mdAndUp" />
    <v-layout class="pl-3 pt-2 body-2" align-center>
      Legenda:
      <v-chip small color="orange" class="mx-1 white--text">Prioridade Baixa</v-chip>
      <v-chip small color="indigo" class="mx-1 white--text">Prioridade Média</v-chip>
      <v-chip small color="red" class="mx-1 white--text">Prioridade Alta</v-chip>
    </v-layout>
    <Chart />
    <v-data-iterator
      v-if="listsFull.length > 0"
      :items="lists"
      disable-pagination
      hide-default-footer
      no-data-text=""
    >
      <template v-slot:default="{items}">
        <List
          v-for="(list, i) in items" :key="`list-${i}`"
          :list="list"
          @editTask="onEditTask($event, list)"
          @deleteTask="onDeleteTask($event, i)"
          @deleteList="onDeleteList(list, i)"
        />
      </template>
    </v-data-iterator>
    <v-layout v-else fill-height justify-center align-center>
      <div class="text-center">
        <h2>Seja bem vindo ao "Let's Do It!"</h2><br>
        Agora você já pode criar suas tarefas.
        <br>
        <v-btn 
          rounded color="green" height="50"
          class="white--text mt-4" @click="onAdd"
        >
          <v-icon class="mr-2">mdi-plus</v-icon>CRIAR TAREFA
        </v-btn>
      </div>
    </v-layout>
    <v-btn
      v-if="listsFull.length > 0" class="add-button"
      fab color="green" @click="onAdd"
      style="position: fixed;bottom: 10px;right: 10px;"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
    <DetailsTask
      :visible="showDetails"
      :isEdit="isEdit"
      :details="details"
      @close="showDetails=false"
    />
    <MessageConfirm
      ref="refMessageConfirm"
      @confirm="onConfirm"
    />
  </v-flex>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import List from '@/components/List.vue';
import MessageConfirm from '@/components/UI/MessageConfirm.vue';
import DetailsTask from '@/components/DetailsTask.vue';
import Chart from '@/components/Chart.vue';

export default {
  name: 'Home',

  components: {
    NavBar,
    List,
    DetailsTask,
    MessageConfirm,
    Chart,
  },
  data() {
    return {
      showDetails: false,
      details: {},
      isEdit: false,
      onConfirm: () => {},
    };
  },
  methods: {
    onAdd() {
      this.isEdit = false;
      this.showDetails = true;
    },
    onEditTask(task, list) {
      this.isEdit = true;
      this.details = Object.assign(task, {
        list: list.title,
        listId: list.id,
      });
      this.showDetails = true;
    },
    onDeleteTask(task, listIndex) {
      if (this.$refs.refMessageConfirm) {
        this.$refs.refMessageConfirm.show('Confirma exclusão da tarefa?');
        this.onConfirm = () => {
          this.$store.dispatch('deleteTask', { task, listIndex });
          this.$store.dispatch('setSnackbar', {
            visible: true,
            text: 'Tarefa excluída com sucesso.',
            color: 'green',
          });
        };
      }
    },
    onDeleteList(list, index) {
      if (this.$refs.refMessageConfirm) {
        this.$refs.refMessageConfirm.show('Confirma exclusão da lista?');
        this.onConfirm = () => {
          this.$store.dispatch('deleteList', { list, index });
          this.$store.dispatch('setSnackbar', {
            visible: true,
            text: 'List excluída com sucesso.',
            color: 'green',
          });
        };
      }
    },
  },
  computed: {
    listsFull() {
      return this.$store.getters.lists;
    },
    lists() {
      return this.$store.getters.listsFiltered;
    },
  },
};
</script>
