<template>
    <div id="nav">
        <nav class="navbar is-info">
            <div class="navbar-start">
                <img src="../assets/logoo.png"  width="90" >
                <router-link class="navbar-item" to="/">Home</router-link>
                <router-link class="navbar-item" to="/search">Search</router-link>
                <router-link v-if="loggedIn" class="navbar-item" to="/chat">Chat</router-link>  
                <router-link v-if="!loggedIn" class="navbar-item" to="/login">Log in</router-link> 
                <router-link v-if="!loggedIn" class="navbar-item" to="/register">Register</router-link>  
            </div>
            <div v-if="loggedIn" class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">Profile</a>
                    <div class="navbar-dropdown is-boxed is-info" id="dropdown">
                        <router-link v-if="loggedIn" class="navbar-item" to="/profile">Profile Info</router-link>
                        <a v-if="loggedIn" v-on:click="logout" class="navbar-item">Log out</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import auth from '../auth'

export default {
   name: "Header",
   data() {
      return {
         loggedIn: auth.loggedIn(localStorage.token)
      }
   },
   created() {
      auth.onLoginStatusChanged = loggedIn => {
        console.log(`onLoginStatusChanged::loggedIn = ${loggedIn}`);
        this.loggedIn = loggedIn;
      }
   },
   methods: {
      // The logout function calls the auth.logout function which allows the user to log out of our system.
      logout: function() {
         auth.logout((response) => {
             console.log(response);
         });
         this.$router.push('/', () => {});
      },
      // This home function allows for refreshes whenever data from the API gets updated
       home: function () {
        this.$router.push('/', () => {});
        //window.location.reload();
        this.$router.go()
      }
   },
   
};
</script>

<style scoped lang="scss">
#nav {
    text-align: left;
    background-color: #061921;
    padding-bottom: 2rem;
    a {
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
        color: #ffffff;
        &.router-link-exact-active {
            color: #ffa600;
        }
    }
}
#dropdown{
    background-color: #061921;
    .navbar-item:hover{
        background-color: #00b3ff
    }
}   
</style>