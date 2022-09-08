<template>
  <v-flex xs12>
    <NavBar />
    <v-data-iterator
      :items="lists"
      disable-pagination	
      hide-default-footer
    >
      <template v-slot:default="{items}">
        <List v-for="(list, i) in items" :key="`list-${i}`" :list="list" />
      </template>
    </v-data-iterator>
    <v-btn 
      fab color="green" @click="showDetails=true"
      style="position: fixed;bottom: 10px;right: 10px;">
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
    <DetailsTask
      :visible="showDetails"
      @close="showDetails=false"
    />
  </v-flex>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import List from '@/components/List.vue';
import DetailsTask from '@/components/DetailsTask.vue';

export default {
  name: 'Home',

  components: {
    NavBar,
    List,
    DetailsTask
  },
  data(){
    return {
      showDetails: false
    }
  },  
  computed:{
    lists(){
      return this.$store.getters["lists"];
    }
  }
};
</script>
