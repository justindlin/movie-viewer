<template>
    <div id="login">
        <!--<div v-if="errorMessage">{{ errorMessage }}</div> -->
             {{ error }}
        <form @submit.prevent="login">
            <section class="section">
                <div class="columns">
                    <div class="column is-4 is-offset-4">
                        
                        <div class="field">
                            <label class="label">E-mail</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="email" name="email" type="email" placeholder="e-mail">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="password" name="password" type="password" placeholder="password">
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link is-rounded">Log-in</button>
                                {{ error }}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
//import auth from '../auth';
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: '' ,
    }
  },
  methods: {
    //This method gets the user email and password from the login page and checks to see if they exist. then gives them a token and sends them to the home page
      login() {
       let user = {
            email: this.email,
            password: this.password
      }
      axios.post('http://localhost:3000/login', user)
        .then(res => {
          // if successful
          if (res.status === 200) {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            this.$router.push('/', () => {});
            window.location.reload()
          } 
        }, err => {
          console.log(err.response);
          this.error = err.response.data.error;
        }) 
    }
  }
}  

</script>

<style scoped lang="scss">

</style>