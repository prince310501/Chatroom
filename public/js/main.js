const socket = io()
const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');

//get username and room
const{username,room}=Qs.parse(location.search,{
	ignoreQueryPrefix:true
})

// console.log(`username-${username} , room-${room}`)
//join chat group
socket.emit('joinRoom',{username:username,room:room})

socket.on('roomUsers',({room,users})=>{
	outputRoom(room)
	outputUsers(users)
})

socket.on('message', message=> {
	// console.log(message)
	outputMessage(message) 

	chatMessage.scrollTop = chatMessage.scrollHeight  //scrolls down after sending msg
});

//Message submit
chatForm.addEventListener('submit', e=> {
	e.preventDefault();
	
	//get msg text
	const msg = e.target.elements.msg.value

	//Emit msg to server
	socket.emit('chatMessage', msg)

	e.target.elements.msg.value = ''  //makes the input empty after sending
	e.target.elements.msg.focus()    //focus the input after sending
})

function outputMessage(message){
	const div = document.createElement('div')
	div.classList.add('message')
	div.innerHTML = `<p class="metta">${message.username}<span>     ${message.time}</span></p>
			<p class = "text">
				${message.text}
			</p>`
	document.querySelector('.chat-messages').appendChild(div)
}

//add room name in dom
function outputRoom(room){
	// console.log(`room ${room}`)
	document.getElementById('room-name').innerHTML=room 
}

//add users in room in dom
function outputUsers(users){
	// console.log(users)
	document.getElementById('users').innerHTML=`
		${users.map(user=>{
			return `<li>${user.username}</li>`
		}).join('')}`
}