// initialize our app and tell it to use some plugins from the modules folder
const express = require('express');
const app = express();
const io = require('socket.io')();

// some config stuff
const PORT = process.env.port || 3000;

// tell our app to serve static files from the public folder
app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

// tell the app to be served up at this port (same as WAMP or MAMP, just a different port)
const server = app.listen(3000, function() {
	console.log('listening on localhost:3000');
});



io.attach(server);

var users = [];
var numClients = 0;

// plug in socket.io
io.on('connection', function(socket) {
	console.log('a user has connected');

	socket.on('room', function(room) {
		socket.join(room);
	});

	socket.on('setUsername', function(data) {
		console.log('Username coming from client ', data);
      if(users.indexOf(data) > -1) {
				console.log('username taken');
				socket.emit('userExists', data);
      } else {
				users.push(data);
				console.log(`users in array: ${users}`);
				socket.emit('userSet', {username: data});
      }
   });

	io.emit('chat message', { for: 'everyone', message: `${socket.id} has joined the chat!` });

	numClients++;
	io.emit('stats', { numClients: numClients });
	console.log('Connected clients:', numClients);

	// listen for a message, and then send it where it needs to go
	socket.on('chat message', function(msg) {
		console.log('message: ', msg);

		// send a message event to all clients
		io.emit('chat message', { for: 'everyone', message: msg });
	});


    socket.on('stats', function(data) {
        console.log('Connected clients:', data.numClients);
    });

	// listen for disconnet
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		msg = `${socket.id} has left the chat!`;
		io.emit('disconnect message', msg);

		numClients--;
		io.emit('stats', { numClients: numClients });
		console.log('Connented clients:', numClients);
	});
});

// var nsp = io.of('/my-namespace');
//
// nsp.on('connection', function(socket){
//   console.log('someone connected');
//
// 	socket.join('some room');
// 	io.to('some room').emit('some event');
//
// 	socket.on('say to someone', function(id, msg){
//     socket.broadcast.to(id).emit('my message', msg);
//   });
//
// });
//
// room = "abc123";
// io.sockets.in('foobar').emit('message', 'anyone in this room?');
//
// nsp.emit('hi', 'everyone!');
