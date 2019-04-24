<template>
  <header>
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between fixed-top">
      <router-link to="/">
        <div class="d-flex" style="text-decoration: none; color:black">
          <a class="navbar-brand text-black"><i class="fab fa-stack-overflow" style="color: #f38138"> hacktiv
            <b>overflow</b></i></a>
        </div>
      </router-link>
      <div id="custom-search-input">
        <input type="text" class="search-query form-control" placeholder="Search" v-model="searchQuery"
          v-if="$route.fullPath === '/'" v-on:keyup.enter="submit">
      </div>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isLogin">
          <router-link to="/asking">
            <button type="button" class="btn btn-light btn-md"><i class="fas fa-pen-nib"> Ask Question</i></button>
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/login">
            <button type="button" class="btn btn-light btn-md"><i class="fas fa-sign-in-alt"> Sign In</i></button>
          </router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <button type="button" class="btn btn-light btn-md" v-on:click.prevent="logoutUser"><i
              class="fas fa-sign-out-alt"> Sign Out</i></button>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/register">
            <button type="button" class="btn btn-light btn-md"><i class="fas fa-user-plus"> Sign Up</i></button>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        searchQuery: '',
      }
    },

    created() {
      if (localStorage.getItem('token')) {
        this.$store.commit('successLogin')
      }
    },

    computed: {
      isLogin() {
        return this.$store.state.isLogin
      }
    },

    methods: {
      logoutUser() {
        localStorage.clear()
        this.$store.commit('userLogout')
      },

      submit() {
        this.$store.dispatch('getAllQuestions', this.searchQuery)
      }
    },
  }

</script>

<style>
  header {
    margin-bottom: 80px;
  }
</style>
