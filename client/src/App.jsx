import { useState } from "react";
import io from 'socket.io-client'
import './styles/App.css';
// import { Routes, Route } from "react-router-dom";

const socket = io.connect('http://localhost:5000')

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState();

  const joinRoom = () => {
    if(userName !== '' && room !== '') {
        socket.emit('join_room', room)
    }
  }

  const changer = event => setUserName(event.target.value)
  const changerRoom = event => setRoom(event.target.value)

  return (
     <div>
         <h3>Join a Chat</h3>
         <input type="text" placeholder='John...' onChange={changer} />
         <input type="text" placeholder='Room Id' onChange={changerRoom}/>
         <button onClick={joinRoom}> Join a Room </button>
     </div>
  );
}

export default App;
