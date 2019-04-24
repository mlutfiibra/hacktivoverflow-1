<template>
  <div>
    <div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body bg-dark text-white">
              <h2 class="card-title">{{ question.title }}</h2>
              <div class="d-flex flex-row">
                <i class="fas fa-arrow-alt-circle-up fa-2x mr-3" @click="upvotes"></i>
                <p style="font-size: 30px"> {{ question.upvotes.length - question.downvotes.length }} </p>
                <i class="fas fa-arrow-alt-circle-down fa-2x ml-3" @click="downvotes"></i>
              </div>
              <p class="card-text text-white" v-html="question.description"></p>
              <div v-if="question.questioner.email == userLogin">
                <a class="btn btn-danger ml-2 btn-sm float-right" @click="deleteQuestion(question._id)">Delete</a>
                <router-link :to="`${question._id}/edit`">
                  <a class="btn btn-primary btn-sm float-right">Edit</a>
                </router-link>
              </div>
            </div>
            <div class="card-footer text-muted">
              Asked on {{new Date(question.created_at).toLocaleString()}} by
              <span>{{question.questioner.name}}</span>
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
    <hr>
    <div>
      <h3 class="text-center">{{question.answers.length}} Answers</h3>
      <div v-if="question.answers.length">
        <div class="row" v-for="(answer, index) in question.answers" :key="index">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div class="card mb-4">
            <div class="card-body">
            <div class=row>
              <div class="col-md-8">
                <p class="card-text" v-html="answer.description"></p>
              </div>
              <div class="col-md-4">
                <div class="d-flex flex-row float-right">
                  <i class="fas fa-arrow-alt-circle-up fa-2x mr-3" @click="upvotesAnswer(answer._id)"></i>
                  <p style="font-size: 30px"> {{ answer.upvotes.length - answer.downvotes.length }} </p>
                  <i class="fas fa-arrow-alt-circle-down fa-2x ml-3" @click="downvotesAnswer(answer._id)"></i>
                </div>
              </div>
              <div v-if="answer.responder.email === userLogin">
                <a class="btn btn-danger ml-2 btn-sm float-right" @click="deleteAnswer(answer._id)">Delete</a>
                <router-link :to="`/answers/${answer._id}/edit`">
                  <a class="btn btn-primary btn-sm float-right">Edit</a>
                </router-link>
              </div>
            </div>
              </div>
              <div class="card-footer text-muted">
                Replied on {{new Date(answer.created_at).toLocaleString()}} by
                <span>{{answer.responder.name}}</span>
              </div>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>
    <hr>
    <div style="width: 800px; margin: auto;">
      Your Answer
      <vue-editor v-model="description"></vue-editor>
      <button type="button" class="btn btn-unique btn-md" @click.prevent="saveContent" style="margin-bottom: 30px">Save</button>
    </div>
  </div>
</template>

<script>
import backend from '../api/backend.js'
import { VueEditor } from 'vue2-editor'

export default {
  data() {
    return {
      question: {
        title: '',
        description: '',
        downvotes: [],
        upvotes: [],
        answers: [],
        questioner: {
          name: ''
        }
      },
      description: ''
    }
  },

  computed: {
    userLogin () {
      return this.$store.state.userLogin
    }
  },

  components: {
    VueEditor
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      backend
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data
        })
        .catch(err => {
          console.log(err)
        })
    },

    upvotes() {
      backend
        .put(`/questions/${this.$route.params.id}/upvotes`, null, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.question = data
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: "You can't vote your question",
            showConfirmButton: false,
            timer: 1000
          })
        })
    },

    downvotes() {
      backend
        .put(`/questions/${this.$route.params.id}/downvotes`, null, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.question = data
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: "You can't vote your question",
            showConfirmButton: false,
            timer: 1000
          })
        })
    },

    upvotesAnswer(id) {
      backend
        .put(`/answers/${id}/upvotes`, null, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.fetchData()
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: "You can't vote your answer",
            showConfirmButton: false,
            timer: 1000
          })
        })
    },

    downvotesAnswer(id) {
      backend
        .put(`/answers/${id}/downvotes`, null, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.fetchData()
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: "You can't vote your question",
            showConfirmButton: false,
            timer: 1000
          })
        })
    },

    saveContent() {
      backend
        .post(`/questions/${this.$route.params.id}/answer`, {
          description: this.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.question = data
          this.description = ''
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteAnswer(id) {
      backend
        .delete('/answers/' + id, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteQuestion(id) {
      backend
        .delete('/questions/' + id, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  div {
    overflow-x: hidden;
  }
</style>
