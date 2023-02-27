import React from 'react';

const ChatBody = ({ messageContent, userName }) => {
    const { message, time, author} = messageContent
    return (
        <div
             className='message'
             id={userName === author ? 'you' : 'other'}
        >
            <div>
                <div className='message-content'>
                    <p> {message} </p>
                </div>
                <div className='message-meta'>
                    <p id='time'> {time} </p>
                    <p id='author'> {author} </p>
                </div>
            </div>
        </div>
    );
};

export default ChatBody;
