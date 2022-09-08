<template>
  <v-app id="myapp">
    <Snackbar/>
    <NavDrawer v-if="$route.path.includes('/login')==false" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from './components/UI/Snackbar.vue';
import NavDrawer from './components/NavDrawer.vue';

export default {
  name: "App",
  data: () => ({
  //
  }),
  components: { Snackbar, NavDrawer }
};
</script>

<style lang="sass">
.wrap-word
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

#myapp.theme--light.v-application
  background: #f1f1f1 !important
</style>