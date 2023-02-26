const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { config } = require('dotenv')
config()

const PORT = process.env.PORT || 4000;

const app = express()

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],

    }
})

io.on('connection', (socket) => {
    console.log('socket.id', socket.id)

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })
    socket.on('join_room', (data) => {
        socket.join(data)
    })
    socket.on('disconnect', () => {
        console.log(`User disconnected with socket.id: ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log(`SERVER IS ON ${PORT}`)
})

