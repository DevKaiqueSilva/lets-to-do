<template>
  <v-dialog v-model="visible" persistent max-width="300">
    <v-card class="pa-3" color="color1" dark>
      {{message}}
      <v-divider class="my-3"/>
      <v-layout>
        <v-flex xs6>
          <v-btn height="40" text @click="visible=false;" block>
            CANCELAR
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn height="40" color="color3" @click="visible=false;$emit('confirm')" block>
            CONFIRMAR
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data(){
    return{
      visible: false,
      message: ""
    }
  },
  methods:{
    show(message){
      this.message = message;
      this.visible = true;
    } 
  }
}
</script>