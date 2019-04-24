import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Asking from './views/Asking.vue'
import Question from './views/Question.vue'
import QuestionEdit from './views/QuestionEdit.vue'
import AnswerEdit from './views/AnswerEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/asking',
      name: 'asking',
      component: Asking,
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: Question,
    },
    {
      path: '/questions/:id/edit',
      name: 'questionedit',
      component: QuestionEdit,
    },
    {
      path: '/answers/:id/edit',
      name: 'answeredit',
      component: AnswerEdit,
    }
  ]
})
