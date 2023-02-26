import React, {useEffect, useState} from 'react';

const Chat = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')

    const changerMessage = event => setCurrentMessage(event.target.value)
    const sendMessage = async () => {
        if(currentMessage !== '') {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }

            await socket.emit('send_message', messageData)
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log('data', data)
        })
    }, [socket]);

    return (
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>

            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    placeholder='Hey...'
                    onChange={changerMessage}
                />
                <button onClick={sendMessage}>&#9658</button>
            </div>
        </div>
    );
};

export default Chat;
