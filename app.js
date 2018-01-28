// initialize our app and tell it to use some plugins from the modules folder
var express = require('express');
var app 		= express();
var http 		= require('http').Server(app);
var io 			= require('socket.io')(http);

// some config stuff
// tell our app to serve css files from that folder
app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

// plug in socket.io
io.on('connection', function(socket) {
	console.log('a user has connected');
	io.emit('chat message', { for: 'everyone', message: `${socket.id} is here to par TAY!!` });

	// listen for a message, and then send it where it needs to go
	socket.on('chat message', function(msg) {
		console.log('message: ', msg);

		// send a message event to all clients
		io.emit('chat message', { for: 'everyone', message: msg });
	});

	// listen for disconnet
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		msg = `${socket.id} has left the building!`;
		io.emit('disconnect message', msg);
	});
});

// tell the app to be served up at this port (same as WAMP or MAMP, just a different port)
http.listen(3000, function() {
	console.log('listening on localhost:3000');
});
