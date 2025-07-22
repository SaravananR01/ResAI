import React, { useState,useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaPaperclip } from "react-icons/fa";
import api from '../services/api';


function Ask() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = async () => {
    if (!query.trim() && !selectedFile) {
      alert("Please enter a question or select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('question', query);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await api.post('/ask', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setQuery('');
      setSelectedFile(null);
      setSelectedFileName('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed');
    }
  };
  const [selectedFileName,setSelectedFileName]=useState('');
  const [selectedFile,setSelectedFile]=useState(null);
  const fileInputRef=useRef(null);

  const handleFileChange=(e)=>{
      setSelectedFile(e.target.files[0]);
      setSelectedFileName(e.target.files[0]?.name||'');
  }

  const handleUpload=async()=>{
      if(!selectedFile){
          alert("Please Select a File");
          return;
      }
      const formData = new FormData();
      formData.append('file',selectedFile);

      try{
          const response=await api.post('/file-upload',formData,{
              headers: {
                  'ContentType':'multipart/form-data',
              },
              withCredentials:true
          });
          console.log('Upload success: ',response.data);
          alert("File Uploaded successfully");
      }catch(error){
          console.log("Upload Failed");
          alert("File Upload Failed");

      }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="w-[90%] max-w-2xl bg-white text-gray-900 p-4 rounded-2xl border border-gray-300 hover:border-indigo-500 shadow-sm flex items-center">
      <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          name='file'
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className='bg-white px-1 py-1 mr-1 rounded-full shadow-md transition font-semibold w-48 text-left hover:cursor-pointer'
        >
          <FaPaperclip className='inline-block'/> {selectedFileName || 'Choose a file'}
        </button>
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
