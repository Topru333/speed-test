<template>
  <div class="fibonacci">
    <b-input-group prepend="N" class="mt-3" id="n_id">
      <b-input-group-prepend is-text>
        <input type="checkbox" v-model="withMap" v-b-tooltip.hover title="with map">
      </b-input-group-prepend>
      <b-form-input v-model="valueN"></b-form-input>
      <b-input-group-append>
        <b-button v-on:click="getFibonacci">Try</b-button>
      </b-input-group-append>
    </b-input-group>
    <br>
    <chart :chart-data="data"></chart>
    <br>
    <b-table striped hover small outlined :items="table_items"></b-table>
  </div>
</template>

<script>
import MathService from '@/services/MathService';
import Chart from '../../services/Chart.js'

export default {
  name: 'FibonacciGraph',
  components: {
    Chart
  },
  data () {
    return {
      valueN: '',
      data: null,
      withMap: false,
      table_items: []
    }
  },
  methods: {
    getFibonacci: async function () {
      let response = await MathService.fetchFibTime({
        params: {
          n: this.valueN,
          map: this.withMap
        }
      });
      console.log(response.data);

      let numbers = [];
      this.table_items = [];
      for (let i = 1; i <= this.valueN; i++) {
        this.table_items.push({n: i,
          js_ms: response.data.jsresult[i - 1],
          cpp_ms: response.data.cppresult[i - 1]
        });

        numbers.push(i);
      }
      this.data = {
        labels: numbers,
        datasets: [
          {
            label: 'C++',
            backgroundColor: 'rgba(8, 121, 121, 0.8)',
            data: response.data.cppresult
          }, {
            label: 'JS',
            backgroundColor: 'rgba(248, 25, 121, 0.8)',
            data: response.data.jsresult
          }
        ],
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>
  .fibonacci {
    height: 80vh;
    width: 80vh;
    display: inline-block;
  }
</style>
