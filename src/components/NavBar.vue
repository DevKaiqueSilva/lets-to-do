<template>
  <v-app-bar elevation="4" color="color1" dark height="60" style="flex-grow:0">
    <v-btn v-if="$vuetify.breakpoint.smAndDown" small icon class="mr-3" @click="$emit('drawer')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <div v-if="$vuetify.breakpoint.smAndDown" class="title-logo">Let's Do It!</div>
    <v-spacer/>
    <v-switch
      v-model="isLight" inset  color="amber" hide-details dark
      :prepend-icon="`mdi-${isLight == false ? 'weather-night' : 'white-balance-sunny'}`"
    />
    <v-btn small icon class="mx-3" @click="onLogout">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isLight: true,
    };
  },
  methods: {
    onLogout() {
      localStorage.removeItem('logged');
      localStorage.removeItem('keepConected');
      this.$router.push('/login');
    },
  },
  watch: {
    isLight(v) {
      this.$vuetify.theme.isDark = !v;
    },
  },
  created() {
    console.log(this.$vuetify);
    this.isLight = !this.$vuetify.theme.isDark;
  },
};
</script>

<style lang="sass" scoped>
.title-logo
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
  color: var(--v-color3-base)
  font-size: 2.5rem
  -webkit-text-stroke: 1px white
</style>
