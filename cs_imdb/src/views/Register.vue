<template>
  <div class="register">
   <RegisterForm v-on:add-user="register"/> 
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm';
//import axios from 'axios';

export default {
  name: 'Register',
  components: {
    RegisterForm
  },
  data() {
    return {
      errorMessage: '',
    };
  },
 methods: {
    register() {}, 
  },
}
</script>

<style scoped lang="scss">
.login {
  margin: 1rem;
}
</style>