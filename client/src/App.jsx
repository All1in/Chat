import { useState } from "react";
import io from 'socket.io-client'
import Chat from "./components/Chat/Chat";
import ChatJoin from "./components/ChatJoin/ChatJoin";
import './styles/App.css';

const socket = io.connect('http://localhost:5000')

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(userName !== '' && room !== '') {
        socket.emit('join_room', room)
        setShowChat(true)
    }
  }
  
  const changer = event => setUserName(event.target.value)
  const changerRoom = event => setRoom(event.target.value)

  return (
     <div className='App'>
         {!showChat ?
             (
                 <div className='joinChatContainer'>
                    <ChatJoin />
                 </div>
             )
            : (
                 <Chat
                     socket={socket}
                     userName={userName}
                     room={room}
                 />
             )
         }
     </div>
  );
}

export default App;
