<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :return-value.sync="time2"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time2"
        :label="label"
        prepend-inner-icon="mdi-clock"
        readonly
        :dense="dense"
        :hide-details="hideDetails"
        :rules="rules"
        :outlined="outlined"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker no-title v-if="menu2" locale="pt-BR"  format="24hr" v-model="time2" full-width @click:minute="changeTime" ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    time: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    outlined: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu2: false,
      time2: ""
    };
  },
  created() {
    this.time2 = this.time;
  },
  methods: {
    changeTime() {
      console.log(this.time2);
      this.$emit("resetTime", this.time2);
      this.$refs.menu.save(this.time2)
    }
  }
};
</script>