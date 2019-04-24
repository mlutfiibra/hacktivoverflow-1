<template>
  <div style="width: 800px; margin: auto;">
    Title
    <input v-model="title" type="text" style="width: 800px;">
    Description
    <vue-editor v-model="description"></vue-editor>
    <button type="button" class="btn btn-unique btn-md" @click.prevent="saveContent">Save</button>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import backend from '../api/backend.js'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      title: '',
      description: ''
    }
  },

  created() {
    backend
      .get('/questions/' + this.$route.params.id, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.title = data.title
        this.description = data.description
      })
      .catch(err => {
        console.log(err)
      })
  },

  methods: {
    saveContent () {
      backend
        .put(`/questions/${this.$route.params.id}`, {
          title: this.title,
          description: this.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(() => {
          this.$router.push(`/questions/${this.$route.params.id}`)
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'All field must be filled',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  },
}
</script>
