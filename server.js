const path = require('path')
const express = require('express')
const http = require('http')
const socketio=require('socket.io')
const formatMessage=require('./utilities/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utilities/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname,'public')))

const bot='Chat Bot'

//When a client connects
io.on('connection', socket => {
	// console.log('new connected')
	socket.on('joinRoom',({username,room})=>{
		const user=userJoin(socket.id,username,room)
		// console.log(username,room)
		// console.log(user)
		socket.join(user.room)

		//Welcome the client joined
		socket.emit('message', formatMessage(bot,'You joined the group'))

		//to broadcast a group when a user connects
		socket.broadcast
		.to(user.room)
		.emit('message', formatMessage(bot,`${user.username} has joined the group`))

		//send users of a room
		io.to(user.room)
		.emit('roomUsers',{
			room:user.room,
			users:getRoomUsers(user.room)
		})

	})
	//listen for chat messages
	socket.on('chatMessage', msg => {

		const user=getCurrentUser(socket.id)
		console.log(user)

		io.to(user.room).emit('message',formatMessage(user.username, msg))
	})

	//when client disconnects
	socket.on('disconnect', () =>{
		const user=userLeave(socket.id)

		if(user)
		{
			io.to(user.room)
			.emit('message', formatMessage(bot,`${user.username} left the group`))

			//send users of a room
			io.to(user.room)
			.emit('roomUsers',{
				room:user.room,
				users:getRoomUsers(user.room)
			})
		}
	})
	
})

const PORT = 4800;

server.listen(PORT, () => console.log(`server connected at PORT ${PORT}`))