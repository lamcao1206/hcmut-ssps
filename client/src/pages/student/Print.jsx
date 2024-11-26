import UploadBox from '../../components/print/UploadBox';
import UploadedFileBox from '../../components/print/UploadedFileBox';
import { useAuth } from '../../contexts/AuthContext';

export default function Print() {
  const { user } = useAuth();
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center gap-6">
      <UploadBox />
      {user.files.length > 0 && <UploadedFileBox />}
    </div>
  );
}
