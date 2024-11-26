import { useAuth } from '../../contexts/AuthContext';

export default function UploadedFileBox() {
  const { user, setUser } = useAuth();

  const handleDeleteFile = (fileName) => {
    const updatedFiles = user.files.filter((file) => file !== fileName);
    setUser({ ...user, files: updatedFiles });
    console.log(`File "${fileName}" deleted.`);
  };

  return (
    <div className="container bg-white shadow-2xl rounded-lg h-[450px] w-[450px] p-[15px] overflow-y-auto">
      <header className="bg-white text-center z-10 mb-2">
        <h2 className="text-xl font-medium text-blue-600">Danh sách các file đã tải lên</h2>
      </header>
      {user.files && user.files.length > 0 ? (
        <ul className="space-y-2">
          {user.files.map((fileName, index) => (
            <li key={index} className="flex justify-between items-center text-gray-700 border-2 rounded-lg p-3">
              <div className="flex items-center">
                <img src="/src/assets/file.png" alt="File Icon" className="w-6 h-6 mr-2" />
                <span>{fileName}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <img src="/src/assets/config.png" alt="Download Icon" className="w-6 h-6 cursor-pointer ml-2" />
                <img src="/src/assets/delete.png" alt="Delete Icon" className="w-6 h-6 cursor-pointer" onClick={() => handleDeleteFile(fileName)} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Chưa có tệp nào được chọn.</p>
      )}
    </div>
  );
}
