import api from '@/services/api';

export default {
  fetchFibTime (params) {
    if (!params) {
      params = {};
    }
    return api().get('fibonacci', params)
  },

  fetchSqrtTime (params) {
    if (!params) {
      params = {};
    }
    return api().get('sqrt', params)
  }
}
