import axios from 'axios'
import Vue from 'vue'

export default {

  getQueueSize() {

    let url = Vue.prototype.dddConfig.dddHttpApiUrlBase + "tasks/status/";
    return axios.get( url );
  }

  /*
  request3DTileGenerate(coords) {
      let url = `http://localhost:8000/api/tasks/gen/${coords}`;
      return axios.get(url);
  }

  getUsers(params) {
    return axios.get('/users', {
      params
    })
  },
  editUser(id, payload) {
    return axios.patch(`/users/${id}`, payload)
  },
  saveUser(payload) {
    return axios.post('/users/', payload)
  },
  deleteUser(id) {
    return axios.delete(`/users/${id}`)
  }
  */

}
