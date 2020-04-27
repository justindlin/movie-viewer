<template>
    <div id="register">
        <form @submit="register">
            <section class="section">
                <div class="columns">
                    <div class="column is-4 is-offset-4">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="username" name="username" type="text" placeholder="username">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="password" name="password" type="password" placeholder="password">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">E-mail</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="email" name="email" type="email" placeholder="e-mail">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="fname" name="fname" type="text" placeholder="First Name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <input class="input is-rounded" v-model="lname" name="lname" type="text" placeholder="Last Name">
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link is-rounded">Register</button>
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

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      fname: '',
      lname: '',
      error: '',
    }
  },
  methods: {
      //This method listens to the register button click, and creates a user object from user input, then checks the database
      //to see if the user and password exists and then if so, then take them to the log-in screen
      register(e) {
            e.preventDefault();
            var bcrypt = require('bcryptjs');
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(this.password, salt);
            let newUser = {
                id: uuidv4(),
                username: this.username,
                password: hash,
                email: this.email,
                fname: this.fname,
                lname: this.lname,
            }
            console.log(newUser);
            //Send up to parent
            this.$emit('add-user', newUser);
            axios.post('http://localhost:3000/register', newUser)
            .then(res => {
                console.log(res) 
                this.error = '';
                this.$router.push('/login');
            }, err => {
                console.log(err.response)
                this.error = err.response.data.error;
            }) 
        }
   }
};
</script>
<style scoped lang="scss">

</style>