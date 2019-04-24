<template>
  <div style="width: 800px; margin: auto;">
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
      description: '',
      prevRoute: null
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from.fullPath
    })
  },

  created() {
    backend
      .get('/answers/' + this.$route.params.id, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.description = data.description
      })
      .catch(err => {
        console.log(err)
      })
  },

  methods: {
    saveContent () {
      backend
        .put(`/answers/${this.$route.params.id}`, {
          title: this.title,
          description: this.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(() => {
          this.$router.push(this.prevRoute)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>
