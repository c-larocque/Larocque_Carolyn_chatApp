(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const socket = io('/my-namespace');

	let messageList = document.querySelector('#messages'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message'),
			userList = document.querySelector('.userList');

	function setNickname() {
		nickName = this.value;
		console.log(nickName);
		socket.emit('setUsername', this.value);
	}

	// var room = "abc123";
  //
	// socket.on('connect', function() {
	// 	socket.emit('room', room);
	// });

	function setUsername() {
       socket.emit('setUsername', document.querySelector('#name').value);
    };

    //var user;
    function handleUserError(msg) {
			document.querySelector('#error-container').classList.add('show-errors');
		}

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
		//debugger;
		let newMsg = `<li>${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li>${msg}</li>`
		messageList.innerHTML += newMsg;
	}

	function addUserToList(user) {
		let newUser = `<li>${user.username}</li>`;
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
	socket.addEventListener('userExists', handleUserError, false);
})();
