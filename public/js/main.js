(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)

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

	function setUsername() {
		socket.emit('setUsername', document.querySelector('#name').value);
  }

  function handleUserError(msg) {
		document.querySelector('#error-message').classList.add('show-errors');
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `${nickName} says: ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
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

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);
	socket.addEventListener('userSet', addUserToList, false);
	socket.addEventListener('userExists', handleUserError, false);
})();
