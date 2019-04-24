<template>
  <div class="table-responsive">
    <table class="table table-striped w-75 m-auto">
      <thead>
        <tr>
          <th>Title</th>
          <th>Asked by</th>
          <th>Posted on</th>
          <th>Votes</th>
          <th>Answers</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <router-link :to="`/questions/${question._id}`">
            <td class="text-primary">{{question.title}}</td>
          </router-link>
          <td>{{question.questioner.name}}</td>
          <td>{{new Date(question.created_at).toLocaleString()}}</td>
          <td>{{question.upvotes.length + question.downvotes.length}}</td>
          <td>{{question.answers.length}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {},
  created() {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    questions() {
      return this.$store.state.questions
    }
    // ...mapState(['questions'])
  },
}
</script>
