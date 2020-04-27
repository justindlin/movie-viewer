import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import Contacts from '../views/Contacts.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Result from '../views/SearchResults.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Chat from '../views/Chat.vue'

//import About from '../views/About.vue'

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/search', name: 'Search', component: Search },
	{ path: '/search/movie', name: 'Result', component: Result },
	{ path: '/profile', name: 'Profile', component: Profile},
	{ path: '/login', name: 'Login', component: Login },
	{ path: '/register', name: 'About', component: Register },
	{ path: '/movie/info', name: 'Info', component: Home},
	{ path: '/chat', name: 'Chat', component: Chat},

  //{ path: '/about', name: 'About', component: About },
]

const router = new VueRouter({
	mode: 'history',
	routes
  })
  
export default router
