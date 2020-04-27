<template>
	<div class="chatbox">
		<div class="title">
			<h1>Group Chat</h1>
			<hr>
		</div>

		<section class="section">
			<div class="columns">
				<div class="column is-4 is-offset-4">
					<form @submit.prevent="sendMessage">
						<div class="field">
							<div class="messageBoard">
								<div class="messages" v-for="(msg,index) in messages" :key="index">
									<p><span class="font-weight-bold"> {{username}}: </span> {{msg.message}}</p>
								</div>
							</div>
							<div class="control">
								<input type="text" v-model="message" class="input is-rounded">
							</div>
						</div>
						<div class="field is-grouped">
							<div class="control">
								<button type="submit" class="button is-link is-rounded">Send</button>
						
							</div>
						</div>
					</form>
                </div>
            </div>
		</section>
	</div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

export default{
	data(){
		return{
			username: '',
			message: '',
			messages: [],
			socket: io('localhost:8000')
		}
	},
	methods: {
		//when button is pressed, send message from client to server
		sendMessage(e){
			e.preventDefault();
			if(this.message!=""){
				this.socket.emit('SEND_MESSAGE', {
					message: this.message
				});
				this.message = ''
			}
		}
	},

	mounted(){

		//getting user's username
		axios.get('http://localhost:3000/user', { headers: { token: localStorage.getItem('token')}})
			.then(res => {
				this.username = res.data.user.username;
			})
		//appending new messages into message array
		this.socket.on('MESSAGE', (data)=>{
			if(data!=""){
				this.messages.push(data);
			}
		});

	}
}
</script>

<style>

.title{
	text-align: center;
}

.chatbox{
	padding-left:20px;
}

.messageBoard{
	background-color: white;
	height:200px;
	overflow-y:scroll;
}

.messages{
	padding-left:10px;
}

input{
	margin-top: 20px !important;
}
</style>