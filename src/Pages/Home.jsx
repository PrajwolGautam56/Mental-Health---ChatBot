// Home.js

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'; // Import the Header component

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userMessage = { text: newMessage, sender: 'user' };

    setMessages([userMessage, ...messages]); // Push the user's message to the start of the array
    setNewMessage(''); // Reset the input field after sending the message

    try {
      const response = await fetch("https://test-rag-master.vercel.app/getanswer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      const responseData = await response.json();

      const botMessage = { text: responseData.data, sender: 'bot' };
      setMessages([botMessage, userMessage, ...messages]); // Push the bot's reply to the start of the array
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* Include the Header component */}
      <div
        ref={chatContainerRef}
        className="flex-grow border-b overflow-auto flex flex-col-reverse px-3" // Reverses the flex direction
        style={{ maxHeight: 'calc(100% - 5rem)' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex justify-${message.sender === 'user' ? 'end' : 'start'} mb-2`}
          >
            {message.sender === 'bot' && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvlb3x5nK3MesvcsPMaDx_fjFvaHb2ssyEbXKVGxRJw&s"
                alt="Bot"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg ml-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
