<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateBR"
        @focus="onFocus"
        v-mask="maskFilter"
        :background-color="backgroundColor"
        :color="color"
        :dense="dense"
        @keyup="changeText"
        placeholder="  /  /    "
        :label="label"
        :rules="rules"
        :hide-details="hideDetails"
        :outlined="outlined"
        prepend-inner-icon="mdi-calendar"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
      locale="PT-BR"
      v-model="dateEU"
      @change="changeDate"
      @input="()=>{menu = false}"
    />
  </v-menu>
</template>
<script>
import { mask } from "vue-the-mask";
export default {
  directives: {
    mask,
  },
  props: {
    date: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    outlined: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "blue"
    },
    label: {
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean, 
      default: false
    }
  },
  data() {
    return {
      menu: false,
      dateBR: "",
      dateEU: "",
    };
  },
  created() {
    this.onInit();
  },
  watch:{
    date(){
      // console.log(this.date);
      if(this.watch==true){
        this.onInit();
      }
    }
  },
  methods: {
    onInit(){
      this.dateEU = this.date;
      if (!!this.date) {
        this.dateBR = this.dateFormated(this.date);
      }else{
        this.dateBR = "";
      }
    },
    changeDate() {
      let date = this.dateEU;
      this.$emit("resetarDate", date);
      this.dateBR = this.dateFormated(date);
    },
    changeText() {
      if (this.dateBR.length == 10) {
        this.dateEU = this.dateBR.split("/").reverse().join("-");
        let date = this.dateEU;
        this.$emit("resetarDate", date);
      }
    },
    dateFormated(date) {
      if(!!this.range){
        if(date[0]!=null){
          let dateBR = [];
          date.forEach(item=>{
            dateBR.push(item.split("-").reverse().join("/"));
          });
          return dateBR.join(" ~ ");
        }else{
          return "";
        }
      }else{
        if (date.length == 10 || date.length == 7) {
          return date.split("-").reverse().join("/");
        } else {
          return date;
        }
      }
    },
    onFocus() {},
  },
  computed: {
    maskFilter(){
      return !!this.range?'##/##/#### ~ ##/##/####':(this.type=='month'?'##/####':'##/##/####');
    }
  },
};
</script>