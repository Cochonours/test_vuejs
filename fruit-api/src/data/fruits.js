
import axios from 'axios'

// TODO put in config
const fruit_api_base_url = 'http://localhost:3000'


function get_async() {
  return axios
    .get(fruit_api_base_url + '/fruit')
}



export default {
  get_async,
}
