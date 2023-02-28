import React from "react";

const ChatJoin = () => {
  return (
    <>
      <h3>Join a Chat</h3>
      <input 
        type="text" 
        placeholder="John..." 
        onChange={changer} 
       />
      <input 
        type="text" 
        placeholder="Room Id" 
        onChange={changerRoom} 
       />
      <button onClick={joinRoom}> Join a Room </button>
    </>
  );
};

export default ChatJoin;
