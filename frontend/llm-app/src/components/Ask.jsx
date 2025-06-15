import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

function Ask({ onSend }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = () => {
    if (query.trim()) {
      onSend(query);
      setQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="w-[90%] max-w-2xl bg-white text-gray-900 p-4 rounded-2xl border border-gray-300 hover:border-indigo-500 shadow-sm flex items-center">
      <input
        type="text"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={query}
        name="question"
        id="question"
        placeholder="Ask any question..."
        className="w-full border-0 outline-none text-base placeholder-gray-500"
      />
      <FaArrowRight
        className="text-indigo-600 hover:text-indigo-700 ml-3 cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
  );
}

export default Ask;
