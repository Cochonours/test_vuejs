
import axios from 'axios'

// TODO put in config
const fruit_api_base_url = 'http://localhost:3000'


/** We need a way to iterate recursively on the response object
 * while checking whether the current object is a fruit or not
 * 
 * @param {Object} obj any object
 * @param {Function} find_cond condition to add current object to result array
 * @param {Array} result_array
 */
function iterate(obj, find_cond, result_array) {
  if (find_cond(obj)) {
    result_array.push(obj)
  }
  else {
    for (var property in obj) {
      if (typeof obj[property] == "object")
        iterate(obj[property], find_cond, result_array)
    }
  }
}

/**
 * Extract fruits from the response data
 * @param {Object} dirty_fruits 
 */
function extract_fruits_from_tree(dirty_fruits) {
  const number_of_fruits = dirty_fruits.fruitCount
  console.warn(dirty_fruits)
  console.warn(number_of_fruits)

  const fruits = []
  iterate(dirty_fruits, fruit_or_not => {
    // There is sometimes an object with isFruit as true but nothing else
    if (fruit_or_not.isFruit) { console.log(fruit_or_not) }
    return fruit_or_not.isFruit && fruit_or_not.name
  }, fruits)

  console.log(fruits)
  if (fruits.length !== number_of_fruits) {
    // Can't throw as I miss a fruit sometimes => error log for now
    console.error(`Couldn't extract the right fruits from the list`)
    // throw `Couldn't extract the right fruits from the list`
  }

  return fruits
}

/** As the API gives weird result, we handle all of that here so the app
 * doesn't have to care about this.
 */
function get_all_async() {
  return axios
    .get(fruit_api_base_url + '/fruit')
    .then(resp => extract_fruits_from_tree(resp.data.data))
}

/** Get one fruit
 * @param {int} fruit_id
 */
function get_one_async(fruit_id) {
  return axios
    .get(fruit_api_base_url + '/fruit/' + fruit_id)
}

function post_new_async(fruit) {
  return axios.post(fruit_api_base_url + '/fruit', fruit)
}

export default {
  get_one_async,
  get_all_async,
  post_new_async,
}
