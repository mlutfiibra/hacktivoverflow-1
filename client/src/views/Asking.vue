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
  methods: {
    saveContent () {
      this.$store.dispatch('createQuestion', {
        title: this.title,
        description: this.description
      })
      .then((data) => {
        this.title = ''
        this.description = ''
        this.$router.push(`/questions/${this.$store.state.newPost._id}`)
      })
    }
  }
}
</script>
