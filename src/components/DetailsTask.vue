<template>
  <v-dialog
    v-model="visible" :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent scrollable max-width="500"
  >
    <v-card v-if="visible">
      <v-card-title primary-title>
        {{isEdit ? 'Edição' : 'Nova'}} Tarefa
      </v-card-title>
      <v-card-text>
        <v-form ref="refFormTask" @submit.prevent="()=>{}">
          <v-layout wrap class="pt-3">
            <v-flex xs6 class="pr-1 mb-2">
              <v-select
                v-model="detailsTemp.listId" :items="lists" label="Lista"
                item-text="list" item-value="listId" outlined
                dense hide-details @change="onChangeList"
              />
            </v-flex>
            <v-flex xs6 class="pl-1 mb-2">
              <v-text-field
                v-model="detailsTemp.list" outlined dense hide-details
                :disabled="detailsTemp.listId > 0" id="list-text-input"
                placeholder="Digite aqui o nome da lista" :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-divider/>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-text-field
                v-model="detailsTemp.title" label="Título" id="task-title-input"
                dense outlined hide-details  :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-textarea
                v-model="detailsTemp.description" label="Descrição" id="task-description-input"
                dense outlined hide-details rows="3" :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-layout align-center>
                <b>Tarefa criada em</b>
                <v-spacer/>
                <div style="width:150px" class="mx-2">
                  <DatePickerMenu
                    :date="detailsTemp.createdAt" outlined dense hideDetails
                    @resetarDate="detailsTemp.createdAt=$event"
                  />
                </div>
                <div style="width:100px">
                  <TimePickerMenu
                    :time="detailsTemp.createdAtTime" outlined dense hideDetails
                    @resetTime="detailsTemp.createdAtTime=$event"
                  />
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-layout align-center>
                <b>Deseja adicionar um prazo?</b>
                <v-spacer/>
                <div style="width:150px" class="mx-2">
                  <DatePickerMenu
                    :date="detailsTemp.planned" outlined dense hideDetails
                    @resetarDate="detailsTemp.planned=$event"
                  />
                </div>
                <div style="width:100px">
                  <TimePickerMenu
                    :time="detailsTemp.plannedTime" outlined dense hideDetails
                    @resetTime="detailsTemp.plannedTime=$event"
                  />
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <b>Prioridade</b>
              <v-slider
                v-model="detailsTemp.priority"
                :tick-labels="prioritys.map(p=>(p.priority))"
                :max="2"
                :color="prioritySelected.color"
                step="1"
                ticks="always"
                tick-size="4"
              />
            </v-flex>
            <v-flex xs6 class="mb-2">
              <v-switch
                v-model="detailsTemp.completed" label="Realizado" color="green"
                prepend-icon="mdi-check-bold" inset hide-details
              />
            </v-flex>
            <v-flex xs6 class="mb-2">
              <v-switch
                v-model="detailsTemp.favorite" label="Favorito" color="amber"
                prepend-icon="mdi-star" inset hide-details
              />
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout>
          <v-flex xs6 class="pr-1">
            <v-btn outlined block height="45" @click="$emit('close')">
              FECHAR
            </v-btn>
          </v-flex>
          <v-flex xs6 class="pl-1">
            <v-btn 
              id="task-save-button" color="color3" block height="45" 
              class="white--text" @click="onSave"
            >
              SALVAR
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import DatePickerMenu from './UI/DatePickerMenu.vue';
import TimePickerMenu from './UI/TimePickerMenu.vue';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      detailsTemp: {},
      showDate: false,
      rules: {
        required: (v) => !!v || 'Preencha o campo',
      },
    };
  },
  components: { DatePickerMenu, TimePickerMenu },
  methods: {
    onSave() {
      if (this.$refs.refFormTask.validate()) {
        if (this.detailsTemp.listId == 0) {
          this.detailsTemp.listId = this.$store.getters.lists.length + 1;
          this.$store.dispatch('addList', {
            id: this.detailsTemp.listId,
            title: this.detailsTemp.list,
          });
        }
        this.$store.dispatch('saveTask', {
          id: this.isEdit ? this.details.id : null,
          listId: this.detailsTemp.listId,
          title: this.detailsTemp.title,
          completed: this.detailsTemp.completed,
          planned: this.detailsTemp.planned ? `${this.detailsTemp.planned}T${this.detailsTemp.plannedTime ? this.detailsTemp.plannedTime : '00:00'}` : null,
          favorite: this.detailsTemp.favorite,
          priority: this.detailsTemp.priority,
          description: this.detailsTemp.description,
          createdAt: this.detailsTemp.createdAt ? `${this.detailsTemp.createdAt}T${this.detailsTemp.createdAtTime ? this.detailsTemp.createdAtTime : '00:00'}` : null,
        });
        this.$store.dispatch('setSnackbar', {
          visible: true,
          text: 'Tarefa salva com sucesso.',
          color: 'green',
        });
        this.$emit('close');
      } else {
        this.$store.dispatch('setSnackbar', {
          visible: true,
          text: 'Preencha todos os campos.',
          color: 'red',
        });
      }
    },
    onChangeList(e) {
      if (e == 0) {
        this.detailsTemp.list = '';
      } else {
        const index = this.lists.findIndex((l) => (l.listId == e));
        if (index >= 0) this.detailsTemp.list = this.lists[index].list;
      }
    },
    init() {
      this.detailsTemp = {
        listId: this.isEdit ? this.details.listId : 0,
        list: this.isEdit ? this.details.list : '',
        title: this.isEdit ? this.details.title : '',
        description: this.isEdit ? this.details.description : '',
        completed: this.isEdit ? this.details.completed : false,
        favorite: this.isEdit ? this.details.favorite : false,
        planned: this.isEdit && this.details.planned ? this.details.planned.substring(0, 10) : null,
        plannedTime: this.isEdit && this.details.planned ? this.details.planned.substring(11, 16) : null,
        priority: this.isEdit ? this.details.priority : 0,
        createdAt: this.isEdit && this.details.createdAt ? this.details.createdAt.substring(0, 10) : moment().format().substring(0, 10),
        createdAtTime: this.isEdit && this.details.createdAt ? this.details.createdAt.substring(11, 16) : moment().format().substring(11, 16),
      };
    },
  },
  watch: {
    visible() {
      this.init();
    },
  },
  computed: {
    lists() {
      const { lists } = this.$store.getters;
      return [
        { listId: 0, list: 'PERSONALIZADO' },
      ].concat(lists.map((l) => ({
        listId: l.id,
        list: l.title,
      })));
    },
    prioritySelected() {
      const index = this.detailsTemp.priority;
      if (index >= 0) return this.prioritys[index];
      return this.prioritys[0];
    },
    prioritys() {
      return [
        { id: 1, priority: 'Baixa', color: 'orange' },
        { id: 2, priority: 'Média', color: 'indigo' },
        { id: 3, priority: 'Alta', color: 'red' },
      ];
    },
  },
};
</script>
