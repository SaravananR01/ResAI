import React, { useState } from 'react';
import Chat from './Chat';
import Ask from './Ask';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hi there! 👋 
I'm your smart assistant. You can upload documents and ask me anything about them.
I can help:
• Summarize content
• Highlight key insights
• Answer specific questions

Just type your question below to get started!`,
    },
  ]);

  const sendMessage = (userMsg) => {
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Great question! (Pretend I parsed a doc)\nHere's a brief insight related to: "${userMsg}"`,
        },
      ]);
    }, 1000);
  };

  return (
    <div>
        <div className='text-4xl'>
            <h1 className='font-playfair text-center border-b-2 border-indigo-500 p-3'>Res AI</h1>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8">
        <Chat messages={messages} />
        <Ask onSend={sendMessage} />
        </div>
    </div>
  );
}

export default ChatPage;
