<template>
  <v-flex xs12 class="px-2 pt-2"> 
    <div id="chart" style="width:100%">
      <apexchart 
        v-if="load==false"
        type="line" height="300" 
        :options="chartOptions" :series="series"
      />
      <v-skeleton-loader v-else type="image" style="height:300px;width:100%" />
    </div>
  </v-flex>
</template>

<script>
import TasksChart from '@/services/TasksChart';
const br = require("apexcharts/dist/locales/pt-br.json");

export default {
  data(){
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 300,
          type: 'line',
          locales: [br],
          defaultLocale: "pt-br",
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Eventos das tarefas por dia',
          align: 'left'
        },
        xaxis: {
          categories: [],
          type: 'date',
          labels: {
            formatter: v => ( v ? v.substring(0,10).split("-").reverse().join("/") : v )
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      load: false
    }
  },
  methods: {
    getChart(){
      this.load = true;
      let allTasks = this.allTasks.map(t=>({
        createdAt: t.createdAt,
        completed: t.completed,
        completedDate: t.completedDate
      }));
      let chart = TasksChart(allTasks);
      console.log(chart);
      this.chartOptions.xaxis.categories = chart.map(c=>(c.date));
      this.series = [
        {
          name: "Criadas",
          data: chart.map(c=>(c.qtdCreated))
        },
        {
          name: "Finalizadas",
          data: chart.map(c=>(c.qtdCompleted))
        }
      ];
      console.log("SERIES, CATEGORIAS: ", this.series, this.chartOptions.xaxis.categories);
      setTimeout(() => {
        this.load = false;
      }, 100);
    }
  },
  computed: {
    allTasks(){
      let tasks = [];
      if(this.listsFiltered.length > 0){
        this.listsFiltered.forEach(l=>{
          if(l.tasks.length > 0){
            tasks = tasks.concat(l.tasks);
          }
        });
      }
      return tasks;
    },
    listsFiltered(){
      return this.$store.getters["listsFiltered"];
    },
    isDark(){
      return this.$vuetify.theme.isDark
    }
  },
  watch: {
    allTasks(){
      this.getChart();
    }
  },
  created(){
    this.getChart();
  }
}
</script>

<style lang="sass">
.v-skeleton-loader__image
  height: 100% !important
</style>