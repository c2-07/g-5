import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:5000'); // Socket.io stub

const CommunityChat = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: `Welcome to the ${domain} community chat!` },
    { id: 2, user: 'Alice', text: 'Hey everyone, excited to be here!' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   socket.on('receive_message', (message) => {
  //     setMessages(prev => [...prev, message]);
  //   });
  //   return () => socket.off('receive_message');
  // }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        text: inputValue.trim()
      };
      setMessages(prev => [...prev, newMessage]);
      // socket.emit('send_message', newMessage);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const pageStyle = {
    backgroundColor: '#121212',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif'
  };

  const headerStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const chatAreaStyle = {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const messageStyle = (isYou) => ({
    alignSelf: isYou ? 'flex-end' : 'flex-start',
    backgroundColor: isYou ? '#007bff' : '#2a2a2a',
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    maxWidth: '70%'
  });

  const inputContainerStyle = {
    padding: '1.5rem',
    backgroundColor: '#1e1e1e',
    borderTop: '1px solid #333',
    display: 'flex',
    gap: '1rem'
  };

  const inputStyle = {
    flex: 1,
    padding: '0.8rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const backBtnStyle = {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <button style={backBtnStyle} onClick={() => navigate('/')}>&larr; Back</button>
        <h2>{domain.toUpperCase().replace('-', ' ')} Community Chat</h2>
      </div>
      
      <div style={chatAreaStyle}>
        {messages.map(msg => (
          <div key={msg.id} style={messageStyle(msg.user === 'You')}>
            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.2rem' }}>
              {msg.user}
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <div style={inputContainerStyle}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={inputStyle}
        />
        <button onClick={handleSend} style={buttonStyle}>Send</button>
      </div>
    </div>
  );
};

export default CommunityChat;
