(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const socket = io('/my-namespace');

	let messageList = document.querySelector('ul'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message'),
			userList = document.querySelector('.userList');

	function setNickname() {
		nickName = this.value;
		console.log(nickName);
		//socket.emit('setUsername', this.value);
	}

	// var room = "abc123";
  //
	// socket.on('connect', function() {
	// 	socket.emit('room', room);
	// });

	socket.on('message', function(data) {
		console.log('Incoming message:', data);
	});

	function setUsername() {
         socket.emit('setUsername', document.getElementById('name').value);
      };
      var user;
      socket.on('userExists', function(data) {
         document.getElementById('error-container').innerHTML = data;
      });
      socket.on('userSet', function(data) {
         user = data.username;
         document.body.innerHTML = '<input type = "text" id = "message">\
         <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
         <div id = "message-container"></div>';
      });

      function sendMessage() {
         var msg = document.getElementById('message').value;
         if(msg) {
            socket.emit('msg', {message: msg, user: user});
         }
      }
      socket.on('newmsg', function(data) {
         if(user) {
            document.getElementById('message-container').innerHTML += '<div><b>' +
               data.user + '</b>: ' + data.message + '</div>'
         }
      })

			// socket.on('typing', function (msg) {
		  //    io.emit('typing', { 'message': msg.message, 'username': msg.username });
			// });

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `${nickName} says ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = `<li>${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li>${msg}</li>`
		messageList.innerHTML += newMsg;
	}

	function addUserToList(user) {
		let newUser = `<li>${user}</li>`;
		userList.innerHTML += newUser;
	}

  // socket.on('stats', function(data) {
  //     console.log('Connected clients:', data.numClients);
  // });

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
	socket.addEventListener('userSet', addUserToList, false);
})();
