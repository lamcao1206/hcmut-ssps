import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function UploadBoxContainer({ children }) {
  return <div className="container bg-white shadow-2xl rounded-lg h-[450px] w-[450px] p-[15px]">{children}</div>;
}

function UploadBoxHeader({ validTypes = [] }) {
  return (
    <header className="mb-2 text-center">
      <h1 className="text-xl font-medium text-blue-600">Tải tài liệu của bạn tại đây</h1>
      <p className="text-gray-500 text-md">Chỉ chấp nhận định dạng: {validTypes.map((type) => type.replace('application/', '')).join(', ')}</p>
    </header>
  );
}

function UploadBoxForm({ onDrop, onFileChange, openFilePicker }) {
  return (
    <div
      className="border-2 border-dashed rounded-lg cursor-pointer flex flex-col justify-center items-center h-[350px]"
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={openFilePicker}
    >
      <input type="file" name="file" id="fileInput" hidden onChange={onFileChange} accept=".docx, .pdf" />
      <label htmlFor="fileInput" className="flex flex-col items-center justify-center h-[200px]">
        <img src="./src/assets/upload.png" alt="upload" className="h-[150px]" />
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-semibold text-gray-500">Kéo và thả tệp vào đây</p>
          <p className="font-medium">hoặc</p>
          <button type="button" className="font-semibold text-blue-600 p-2 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white">
            Chọn từ máy tính
          </button>
        </div>
      </label>
    </div>
  );
}

function UploadBox() {
  const [file, setFile] = useState(null);
  const [validTypes, setValidTypes] = useState([]);
  const { user, setUser } = useAuth();
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchValidTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/system');
        console.log(response.data);
        const { allowExtensions } = response.data;
        setValidTypes(allowExtensions.map((ext) => `application/${ext}`));
      } catch (err) {
        console.error(err);
      }
    };

    fetchValidTypes();
  }, []);

  const validateFile = (file) => {
    return file && validTypes.includes(file.type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      alert('Chỉ chấp nhận các tệp :' + validTypes.join(', '));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setUser((prevUser) => ({ ...prevUser, files: [...prevUser.files, selectedFile.name] }));
    } else {
      alert('Chỉ chấp nhận các tệp :' + validTypes.join(', '));
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <UploadBoxContainer>
      <UploadBoxHeader validTypes={validTypes} />
      <UploadBoxForm onDrop={handleDrop} onFileChange={handleFileChange} openFilePicker={openFilePicker} />
      <input ref={fileInputRef} type="file" hidden id="fileInput" onChange={handleFileChange} accept={validTypes.join(',')} />
    </UploadBoxContainer>
  );
}

export default UploadBox;
