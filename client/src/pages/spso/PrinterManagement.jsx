import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PrinterModalLabel({ id, name, type = 'text', value, onChange }) {
  const disable = name === 'Status';
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {name}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={onChange}
        disabled={disable}
      />
    </div>
  );
}

function PrinterModal({ title, printerInfor, handleChange, onClickCancel, onClickSubmit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(printerInfor)
            .filter(([key]) => key !== 'Description')
            .map(([key, value]) => (
              <PrinterModalLabel key={key} name={key} id={key} value={value} onChange={handleChange} />
            ))}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
              Description
            </label>
            <textarea
              id="Description"
              name="Description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={printerInfor.Description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition duration-300" onClick={onClickCancel}>
            Huỷ
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300" onClick={onClickSubmit}>
            {title}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PrinterManagement() {
  const [printers, setPrinters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPrinter, setNewPrinter] = useState({
    Brand: '',
    Name: '',
    Model: '',
    CampusName: '',
    Building: '',
    RoomNumber: '',
    Description: '',
  });
  const [choosenPrinter, setChoosenPrinter] = useState(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/printers');
        setPrinters(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrinters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrinter((prevPrinter) => ({
      ...prevPrinter,
      [name]: value,
    }));
  };

  const handleChoosenPrinterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setChoosenPrinter((prevPrinter) => ({
      ...prevPrinter,
      [name]: value,
    }));
  };

  const handleSubmitEditPrinter = async (printer) => {
    try {
      await axios.put(`http://localhost:3000/printers/${printer.id}`, printer);
      setPrinters((prevPrinters) => prevPrinters.map((p) => (p.id === printer.id ? printer : p)));
      setChoosenPrinter(null);
      toast.success('Đã cập nhật thông tin máy in');
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi cập nhật thông tin máy in');
    }
  };

  const handleSubmitAddPrinter = async (printer) => {
    try {
      printer['Status'] = 'Đang hoạt động';
      const response = await axios.post('http://localhost:3000/printers', printer);
      setPrinters((prevPrinters) => [...prevPrinters, response.data]);
      setShowModal(false);
      toast.success('Đã thêm máy in mới');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePrinterActive = async (printer) => {
    printer.Status = printer.Status === 'Đang hoạt động' ? 'Đã tắt' : 'Đang hoạt động';
    try {
      await axios.put(`http://localhost:3000/printers/${printer.id}`, printer);
      setPrinters((prevPrinters) => prevPrinters.map((p) => (p.id === printer.id ? printer : p)));
      toast.success('Đã cập nhật trạng thái máy in');
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPrinters = printers.filter((printer) => printer.Name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pb-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 pt-[80px]">Quản lý máy in</h1>

      <div className="flex justify-between items-center bg-white shadow-md p-4 w-[1200px] mb-6 rounded-lg">
        <button className="px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition" onClick={() => setShowModal(true)}>
          Thêm máy in
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm máy in..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-4/5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 w-[1200px]">
        {filteredPrinters.map((printer) => (
          <div key={printer.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">{printer.Name}</h2>
            <p className={`mb-4 font-semibold ${printer.Status === 'Đang hoạt động' ? 'text-green-500' : 'text-gray-500'}`}>Trạng thái: {printer.Status}</p>
            <img src="/src/assets/printing.jpg" alt={printer.Name} className="w-32 h-32 object-cover rounded-lg mb-4" />
            <div className="flex justify-center items-center gap-2">
              <button
                className={`p-2 rounded-lg text-white font-bold 
                ${printer.Status === 'Đang hoạt động' ? 'bg-red-500' : 'bg-green-500'} 
                hover:${printer.Status === 'Đang hoạt động' ? 'bg-red-600' : 'bg-green-700'}`}
                onClick={() => handleChangePrinterActive(printer)}
              >
                {printer.Status === 'Đang hoạt động' ? 'Tắt máy in' : 'Bật máy in'}
              </button>
              <button className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-800 font-bold" onClick={() => setChoosenPrinter(printer)}>
                Chỉnh sửa
              </button>
            </div>
          </div>
        ))}
      </div>

      {choosenPrinter && (
        <PrinterModal
          title="Chỉnh sửa máy in"
          printerInfor={choosenPrinter}
          handleChange={handleChoosenPrinterChange}
          onClickCancel={() => setChoosenPrinter(null)}
          onClickSubmit={() => handleSubmitEditPrinter(choosenPrinter)}
        />
      )}

      {showModal && (
        <PrinterModal
          title="Thêm máy in"
          printerInfor={newPrinter}
          handleChange={handleInputChange}
          onClickCancel={() => setShowModal(false)}
          onClickSubmit={() => handleSubmitAddPrinter(newPrinter)}
        />
      )}
      <ToastContainer />
    </div>
  );
}
