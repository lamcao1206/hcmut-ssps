import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SystemConfig() {
  const [config, setConfig] = useState({ allowExtensions: [], defaultPages: 0 });
  const [allowEdit, setAllowEdit] = useState(false);
  const [editConfig, setEditConfig] = useState({ allowExtensions: '', defaultPages: 0 });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('http://localhost:3000/system');
        setConfig(response.data);
        setEditConfig({
          allowExtensions: response.data.allowExtensions.join(', '),
          defaultPages: response.data.defaultPages,
        });
      } catch (error) {
        console.error('Error fetching system config:', error);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedConfig = {
        allowExtensions: editConfig.allowExtensions.split(',').map((ext) => ext.trim()),
        defaultPages: parseInt(editConfig.defaultPages, 10),
      };
      await axios.put('http://localhost:3000/system', updatedConfig);
      setConfig(updatedConfig);
      toast.success('Cấu hình hệ thống được lưu thành công');
      setAllowEdit(false);
    } catch (error) {
      console.error('Error saving system config:', error);
      toast.error('Xảy ra lỗi khi lưu cấu hình hệ thống');
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Quản lí cấu hình máy in</h1>
        <div className="flex justify-left items-center gap-10">
          <img src="/src/assets/system_config.jpg" alt="System Config" className="w-80 object-cover rounded-lg" />
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="allowExtensions">
                Định dạng cho phép
              </label>
              <input id="allowExtensions" name="allowExtensions" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={editConfig.allowExtensions} onChange={handleChange} disabled={!allowEdit} />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="defaultPages">
                Số trang mặc định cấp cho mỗi sinh viên
              </label>
              <input id="defaultPages" name="defaultPages" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={editConfig.defaultPages} onChange={handleChange} disabled={!allowEdit} />
            </div>
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300" onClick={handleSave} disabled={!allowEdit}>
                Lưu
              </button>
              <button className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition duration-300" onClick={() => setAllowEdit(true)}>
                Chỉnh sửa
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition duration-300" onClick={() => setEditConfig({ allowExtensions: config.allowExtensions.join(', '), defaultPages: config.defaultPages })}>
                Huỷ
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
