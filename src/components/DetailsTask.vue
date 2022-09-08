<template>
  <v-dialog 
    v-model="visible" :fullscreen="$vuetify.breakpoint.smAndDown" 
    persistent scrollable max-width="500"
  >
    <v-card>
      <v-card-title primary-title>
        {{isEdit ? 'Edição' : 'Nova'}} Tarefa
      </v-card-title>
      <v-card-text>
        <v-form ref="refFormTask" @submit.prevent="()=>{}">
          <v-layout wrap class="pt-3">
            <v-flex xs12 md6 class="pr-1 mb-2">
              <v-select 
                v-model="detailsTemp.listId" :items="lists" 
                item-text="list" item-value="listId" outlined 
                dense hide-details @change="onChangeList" :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 md6 class="pl-1 mb-2">
              <v-text-field 
                v-model="detailsTemp.list" outlined dense hide-details
                label="Lista" :disabled="detailsTemp.listId > 0" 
                placeholder="Digite aqui o nome da lista" :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-divider/>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-text-field 
                v-model="detailsTemp.title" label="Título" 
                dense outlined hide-details  :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-textarea 
                v-model="detailsTemp.description" label="Descrição" 
                dense outlined hide-details rows="3" :rules="[rules.required]"
              />
            </v-flex>
            <v-flex xs12 class="mb-2">
              <v-layout align-center>
                <b>Deseja adicionar um prazo?</b>
                <v-spacer/>
                <div style="width:150px" class="mx-2"><DatePickerMenu :date="detailsTemp.planned" outlined dense hideDetails /></div>
                <div style="width:100px"><TimePickerMenu :time="detailsTemp.plannedTime" outlined dense hideDetails/></div>
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
            <v-flex xs12 md6 class="mb-2">
              <v-switch 
                v-model="detailsTemp.completed" label="Realizado" color="green" 
                prepend-icon="mdi-check-bold" inset hide-details
              />
            </v-flex>
            <v-flex xs12 md6 class="mb-2">
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
            <v-btn color="color3" block height="45" class="white--text" @click="onSave">
              SALVAR
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePickerMenu from './UI/DatePickerMenu.vue';
import TimePickerMenu from './UI/TimePickerMenu.vue';
export default {
  props: {
      visible: {
        type: Boolean,
        default: false
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      details: {
        type: Object,
        default: () => { }
      }
  },
  data() {
    return {
      detailsTemp: {},
      showDate: false,
      rules: {
        required: v => !!v || "Preencha o campo"
      }
    };
  },
  components: { DatePickerMenu, TimePickerMenu },
  methods:{
    onSave(){
      if(this.$refs.refFormTask.validate()){
        let task = {
          
        };
      }else{
        this.$store.dispatch("setSnackbar", {
          visible: true,
          text: "Preencha todos os campos.",
          color: "red"
        });
      }
    },  
    onChangeList(e){
      console.log(e);
      if(e==0){
        this.detailsTemp.list = "";
      }else{
        let index = this.lists.findIndex(l=>(l.listId == e));
        if(index >= 0) this.detailsTemp.list = this.lists[index].list;
      }
    },
    init(){
      this.detailsTemp = {
        listId: 0,
        list: "",
        title: "",
        description: "",
        completed: false,
        favorite: false,
        planned: null,
        plannedTime: null,
        priority: 0
      }
    }
  },
  watch:{
    visible(){
      this.init();
    }
  },
  computed: {
    lists(){
      let lists = this.$store.getters["lists"];
      return [
        { listId: 0, list: "PERSONALIZADO" }
      ].concat(lists.map(l=>({
        listId: l.id,
        list: l.title
      })))
    },
    prioritySelected(){
      let index = this.detailsTemp.priority;
      if(index >= 0) return this.prioritys[index];
      else return this.prioritys[0];
    },
    prioritys(){
      return [
        { id: 1, priority: "Baixa", color: "orange" },
        { id: 2, priority: "Média", color: "indigo" },
        { id: 3, priority: "Alta", color: "red" }
      ]
    }
  }
}
</script>