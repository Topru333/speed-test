import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import FibonacciGraph from '@/components/pages/FibonacciGraph';
import SqrtGraph from '@/components/pages/SqrtGraph';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/fibonacci',
      name: 'FibonacciGraph',
      component: FibonacciGraph
    },
    {
      path: '/sqrt',
      name: 'SqrtGraph',
      component: SqrtGraph
    }
  ]
});
