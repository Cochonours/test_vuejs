<template>
  <div class="fruit">
    <h1>Add a fruit</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="fruit.name">
        <div class="error" v-if="!$v.fruit.name.required">Name is required.</div>
        <div class="error" v-if="!$v.fruit.name.minLength">Name is too short.</div>
      </div>
      <div>
        <label for="image">Image path:</label>
        <input name="image" v-model="fruit.image">
        <div class="error" v-if="!$v.fruit.image.required">Image path is required.</div>
        <div class="error" v-if="!$v.fruit.image.is_image_link">Image path is wrong.</div>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" name="price" v-model="fruit.price">
        <div class="error" v-if="!$v.fruit.price.required">Price is required.</div>
        <div class="error" v-if="!$v.fruit.price.minValue">Price must be positive.</div>
      </div>
      <div>
        <label for="color">Color (html):</label>
        <input name="color" v-model="fruit.color">
        <div class="error" v-if="!$v.fruit.color.required">Color is required.</div>
        <div class="error" v-if="!$v.fruit.color.is_html_color">Color is invalid.</div>
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="textarea" name="description" v-model="fruit.description">
        <div class="error" v-if="!$v.fruit.description.required">Description is required.</div>
      </div>
      <div>
        <label for="taste">Taste:</label>
        <input name="taste" v-model="fruit.taste">
        <div class="error" v-if="!$v.fruit.taste.required">Taste is required.</div>
        <div class="error" v-if="!$v.fruit.taste.minLength">Taste is too short.</div>
      </div>
      <div>
        <label for="expires">Expiration date:</label>
        <input type="date" name="expires" v-model="fruit.expires_date">
        <input type="time" name="expires" v-model="fruit.expires_time">
        <div class="error" v-if="!$v.fruit.expires.required">Expiration is required.</div>
      </div>
        <button type="submit">
          Submit
        </button>
    </form>
  </div>
</template>


<script>
import fruits_api from '@/data/fruits'
import { required, minLength, decimal } from 'vuelidate/lib/validators'

function is_html_color(value) {
  if (!value) {
    return true // Handled by "required"
  }

  return /^#([0-9A-F]{3}){1,2}$/i.test(value)
}
function is_image_link(value) {
  if (!value) {
    return true // Handled by "required"
  }

  return /^http.*\.(gif|jpe?g|png)$/i.test(value)
}

export default {
  name: 'Fruit',
  data() {
    return {
      fruit: {
        name: null,
        image: null,
        price: null,
        color: '#',
        description: null,
        taste: null,
        expires_date: null,
        expires_time: null,
        expires: null,
        isFruit: true,
      }
    }
  },
  validations: {
    fruit: {
      name: {
        required,
        minLength: minLength(3),
      },
      image: {
        required,
        is_image_link,
      },
      price: {
        required,
        decimal,
        minValue: 0,
      },
      color: {
        required,
        is_html_color,
      },
      description: {
        required,
      },
      taste: {
        required,
        minLength: minLength(3),
      },
      expires: {
        required,
      },
    }
  },
  methods: {
    format_price(price_str) {
      return price_str + ' €'
    },
    submit() {
      this.fruit.expires = this.fruit.expires_time
        ? new Date(this.fruit.expires_date + " " + this.fruit.expires_time)
        : new Date(this.fruit.expires_date)

      // Forces vuelidate to check all properties
      this.$v.fruit.$touch()

      if (this.$v.fruit.$error) {
        alert("Some fields are in error")
      }
      else {
        // the API doesn't clean up so we shoudln't send too much data
        const fruit = { ...this.fruit };
        delete fruit.expires_date
        delete fruit.expires_time

        fruits_api.post_new_async(fruit)
          .then(() => alert("Post successful"))
          .catch(() => alert("Error while posting info"))
      }
    }
  },
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.75em;
}
h1 {
  text-transform: capitalize;
}
label {
  display: inline-block;
  text-align: right;
  width: 10em;
  margin-right: 0.7em;
}
</style>
