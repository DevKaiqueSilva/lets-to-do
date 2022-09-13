<template>
  <v-app id="myapp">
    <Snackbar/>
    <NavBar 
      v-if="$vuetify.breakpoint.smAndDown && $route.path.includes('/login')==false" 
      @drawer="showDrawer=!showDrawer"
    />
    <NavDrawer
      :visible="showDrawer || $vuetify.breakpoint.mdAndUp"
      v-if="$route.path.includes('/login')==false"
      @drawer="showDrawer=$event"
    />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from './components/UI/Snackbar.vue';
import NavDrawer from './components/NavDrawer.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  data: () => ({
    showDrawer: false,
  //
  }),
  components: { Snackbar, NavDrawer, NavBar },
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
