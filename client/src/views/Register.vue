<template>
  <div class="card" style="width: 450px; margin: auto">
    <h5 class="card-header stylish-color-dark white-text text-center py-4 mb-4">
      <strong>Sign up</strong>
    </h5>
    <div class="card-body px-lg-5 pt-0">
      <form class="text-center" style="color: #757575;">
        <div class="md-form mt-0">
          <input type="text" v-model="name" id="materialRegisterFormName" class="form-control">
          <label for="materialRegisterFormName">Name</label>
        </div>
        <div class="md-form mt-0">
          <input type="email" v-model="email" id="materialRegisterFormEmail" class="form-control">
          <label for="materialRegisterFormEmail">E-mail</label>
        </div>
        <div class="md-form">
          <input type="password" v-model="password" class="form-control" id="materialRegisterFormPassword"
            aria-describedby="materialRegisterFormPasswordHelpBlock">
          <label for="materialRegisterFormPassword">Password</label>
        </div>
        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit"
          @click.prevent="register">Sign
          up</button>
        <p>Already have an account?
          <router-link to="/login">
            <a>Login</a>
          </router-link>
        </p>
        <hr>
      </form>
    </div>

  </div>
</template>

<script>
import backend from '@/api/backend.js'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },

  methods: {
    register() {
      backend
        .post('/users', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
}
</script>


<style scoped>
  @media(min-width: 768px) {
    .field-label-responsive {
      padding-top: .5rem;
      text-align: right;
    }
  }

</style>
