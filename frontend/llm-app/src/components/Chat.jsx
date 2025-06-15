import React from 'react';

function Chat({ messages }) {
  return (
    <div className="w-[90%] max-w-2xl mx-auto p-4 bg-white rounded-2xl border border-gray-300 shadow-sm">

      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[75%] rounded-lg text-sm whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-indigo-100 text-gray-900'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
