<template>
  <div id="app">
    <div id="container">
      <Header title="CS-IMDb" />
      <Nav />
    </div>
    <router-view/>
  </div>
</template>

<script>
//import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";


export default {
  name: 'App',
  components: {
    //Header,
    Nav
  }
}
</script>

<style>

body {
  margin: 0;
  background-color: #dfdfdfc9;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#container{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#container #nav{
  flex: 2;
}

.logo{
  width: 25%
}
#nav {
  padding: 40px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.movie{
  padding-left: 10rem;
}
</style>
