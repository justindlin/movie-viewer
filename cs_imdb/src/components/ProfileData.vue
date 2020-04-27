<template>
    <div id="profileinfo" style="padding-left:40px">
      <div class="right info">
          <h1>My Information</h1>
          <hr>
          <label class="label">Hello {{ username }}</label> 
           <label class="label"> First Name: {{fname}} </label>
           <label class="label">Last Name: {{lname}} </label>
           <label class="label">Email: {{email}} </label>
      </div>
      <hr>
      <h1 id="myinfo">Favorite Movies</h1>
      <div id="movieContainer" class="grid-container hide">
        <main id="display" class="grid-item main">
          <div id="scroller" class="items hide">
          </div>
        </main>
      </div>

    </div>
</template>
<script>

import axios from 'axios';
import tool from '../search';
import scroll from '../scroll';

export default {
    name: 'ProfileData',
    data () {
      return {
      username: '',
      email: '',
      fname: '',
      lname: '',
      movies: ''
    }
  },
  created() {
    //check if user is created
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  },
  mounted() {
    //get user information
    
    
    axios.get('http://localhost:3000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.username = res.data.user.username;
        this.email = res.data.user.email;
        this.fname = res.data.user.fname;
        this.lname = res.data.user.lname;
        this.movies = res.data.user.movieList;
        console.log(this.movies);
        scroll.startup();
        tool.showFav(this.movies);
      })
    
  },
}
//#dfdfdfc9
</script>


<style scoped>


#hide{
  display: none;
}

.profileinfo{
  padding-left:20px !important;
}

h1{
  padding-top:30px;
}

#grid-container{
  margin-top:50px;
}

.display{
  background-color: #dfdfdfc9;
}

h1 { 
  font-family: "Times New Roman", Times, serif; 
  //font-size: 20px;
}

h2{
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  font-size: 30px;
}
$gray: #555;
$yellow: #f2e968;
$white: #efefef;

@import url(https://fonts.googleapis.com/css?family=Rubik);

body,
html {
  text-align: center;
  background: $white;
  font-family: Helvetica, sans-serif;
  margin: 0;
}

.grid-container {
  background: $white;
  font-family: "Rubik", sans-serif;
}

@supports (display: grid) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr auto;

    grid-template-areas:
    "header header header"
    "title title footer"
    "main main main";
    @media screen and (max-width: 200px) {
      grid-template-columns: 1fr;
      grid-template-rows: 0.3fr 1fr auto 1fr;
      grid-template-areas:
      "header"
      "title"
      "main"
      "footer";
    }
  }

  .grid-item {
    color: #fff;
    padding: 1em 1.5em;
    font-size: 1em;
    font-weight: 700;

  }

  .main {
    color: lighten($gray, 25%);
    grid-area: main;
    padding: 0;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .items {
    position: relative;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    transition: all 0.2s;
    transform: scale(0.98);
    will-change: transform;
    user-select: none;
    cursor: pointer;

  }

  .items.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    transform: scale(1);
  }

  .item {
    display: inline-block;
    min-height: 325px;
    min-width: 50px;
    margin: 2em 1em;
    @media screen and (max-width: 200px) {
      min-height: 200px;
      min-width: 50px;
    }
  }
}
</style>