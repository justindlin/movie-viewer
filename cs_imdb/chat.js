const express = require('express');
const app = express();

server = app.listen(8000, function(){
	console.log('chat server running on port 8000');
});

const io = require('socket.io')(server);

//socket is being used to send data from server to client side
io.on('connection', function(socket){
	console.log(socket.id);
	socket.on('SEND_MESSAGE', function(data){
		io.emit('MESSAGE', data);
		
	});
});