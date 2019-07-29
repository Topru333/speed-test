<template>
  <div class="sqrt">
    <b-input-group prepend="N" class="mt-3" id="n_id">
      <b-form-input placeholder="Min difference" v-model="closeto"></b-form-input>
      <b-form-input placeholder="Max value of squared number" v-model="valueN"></b-form-input>
      <b-input-group-append>
        <b-button v-on:click="getSqrt">Try</b-button>
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
      closeto: '0.001',
      table_items: []
    }
  },
  methods: {
    getSqrt: async function () {
      let response = await MathService.fetchSqrtTime({
        params: {
          n: this.valueN,
          closeto: this.closeto
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
  .sqrt {
    height: 80vh;
    width: 80vh;
    display: inline-block;
  }
</style>
