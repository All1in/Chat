import React, {useEffect, useState} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import ChatBody from "../ChatBody/ChatBody";

const Chat = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const changerMessage = event => setCurrentMessage(event.target.value)
    const enterPressed = event => event.key === 'Enter' && sendMessage()
    const sendMessage = async () => {
        if(currentMessage !== '') {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }

            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket]);

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return (
                            <ChatBody
                                key={index}
                                messageContent={messageContent}
                                userName={userName}
                            />
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={changerMessage}
                    onKeyPress={enterPressed}
                />
                <button onClick={sendMessage}> &#9658; </button>
            </div>
        </div>
    );
};

export default Chat;
