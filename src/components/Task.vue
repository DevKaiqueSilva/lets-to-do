<template>
  <v-card class="px-3 py-2 task" :priority="task.priority">
    <v-layout align-center>
      <v-checkbox :input-value="task.completed" class="ma-0 mr-1" hide-details color="green" @change="onCompleted"/>
      <v-flex style="max-width: calc(100% - 140px);">
        <v-layout>
          <b>{{task.title}}</b>
          <v-chip v-if="task.planned" label class="ml-2 pa-1" small color="color4">
            <v-icon size="18" class="mr-1">mdi-calendar</v-icon>
            {{formatDateBr(task.planned)}}
          </v-chip>
      </v-layout>
        <div class="body-2 wrap-word">
          {{task.description}}
        </div>
      </v-flex>
      <v-btn icon small class="mr-3" @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small class="mr-3" @click="$emit('delete')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon small @click="task.favorite = !task.favorite">
        <v-icon :color="task.favorite ? 'amber' : ''" >mdi-star{{task.favorite?'':'-outline'}}</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    list: {
      type: Object, 
      required: true
    }
  },
  methods: {
    onCompleted(e){
      this.$store.dispatch("saveTask", Object.assign(this.task, {
        listId: this.list.id,
        list: this.list.title,
        completedDate: e == true ? moment().format().substring(0,16) : null
      }));
    },
    formatDateBr(date){
      let dateBr = date;
      if(date && date.length >= 10){
        dateBr = date.substring(0,10).split("-").reverse().join("/");
        if(date.length >= 16){
          dateBr += ` ${date.substring(11,16)}`;
        }
      }
      return dateBr;
    },
    getPriorityColor(){
      if(this.task.priority==1) return ""
    }
  }
}
</script>

<style lang="sass">
.task
  &[priority="0"]
    border-right: 5px solid #FF9800
  &[priority="1"]
    border-right: 5px solid #3F51B5
  &[priority="2"]
    border-right: 5px solid #F44336
  &-planned
    display: flex
    flex-direction: row
    align-items: center
</style>