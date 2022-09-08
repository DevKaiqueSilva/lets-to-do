<template>
  <v-card class="px-3 py-2 task">
    <v-layout align-center>
      <v-checkbox v-model="task.completed" class="ma-0 mr-1" hide-details color="green"/>
      <v-flex>
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
      <v-btn icon small class="mr-3">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small class="mr-3">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon small @click="task.favorite = !task.favorite">
        <v-icon :color="task.favorite ? 'amber' : ''" >mdi-star{{task.favorite?'':'-outline'}}</v-icon>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDateBr(date){
      let dateBr = date;
      if(date && date.length >= 10){
        dateBr = date.substring(0,10).split("-").reverse().join("/");
        if(date.length >= 16){
          dateBr += ` ${date.substring(0,16)}`;
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
  &-planned
    display: flex
    flex-direction: row
    align-items: center
</style>