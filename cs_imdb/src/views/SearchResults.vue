<template>
	<div id="results">
		
		<div id="left"> </div>
		<div id="right"> 
			<div id="bookmarkContainer">
				<form @submit.prevent="addMovie">
					<button v-if="loggedIn" id="bookmark">
						
					</button>
				</form>
			</div>
		</div>
		<img src="../assets/star.png" id="hide"/>


	</div>
</template>

<script>

import tool from '../search';
import axios from 'axios';
import auth from '../auth'

//<img src="../assets/star.png" />
export default {
	data(){
		return{
			username: '',
			movieList: '',
			loggedIn: auth.loggedIn(localStorage.token)
		}
		
	},
	name: 'Results',
	created(){
		tool.display(this.$route.query.movieID);
	},
	methods: {
		//adding or removing a movie from the favorite list once button is pressed
		addMovie(e){

			let newList = "";
			if(this.movieList==undefined){
				newList = this.$route.query.movieID;
			}else{
				newList = this.movieList + "," + this.$route.query.movieID;
			}
			let user = {
				username: this.username,
				movieList: newList
			}
			e.preventDefault();
			axios.post('http://localhost:3000/update', user)

			this.movieList = tool.parser(newList);
			tool.checkFav(this.movieList, this.$route.query.movieID);
		},
	},
	mounted(){
		//getting the user's info from DB
		axios.get('http://localhost:3000/user', { headers: { token: localStorage.getItem('token')}})
			.then(res => {
				this.username = res.data.user.username;
				this.movieList = res.data.user.movieList;

				tool.checkFav(res.data.user.movieList, this.$route.query.movieID);
			})

		
	},
}
</script>

<style>

svg{
	height: 50px !important;
	width:auto !important;
}

#bookmarkContainer{
	position:absolute;
	top: 165px;
	right:20%;
}

button{
	background-color: white;
	padding:10px;
	border-radius: 10px;
}

#hide{
	display:none;
}

.overview{
	padding: 20px 0px;
}

.castTable th{
	padding-top: 15px;
}

.castTable td{
	padding: 10px 60px 0px 0px;
}

.stars{
	height: 20px;
	width:auto;
}

#results{
	padding-top: 50px;
}
#left{
	display:inline-block;
	width:30%;
	padding-left: 50px;
}

#right{
	margin-top:0px;
	display:inline-block;
	width:50%;
	vertical-align: top;
}

.poster{
	height: 600px;
	width: auto;
}

h1{
	font-size:40px;
	font-weight: bold;
}

h2{
	font-style: italic;
}

</style>