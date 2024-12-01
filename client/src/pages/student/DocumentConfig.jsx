import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ConfigInput({ label, id, options, value, onChange, name, disabled = false, init = '' }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 text-md font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="relative w-1/2 ml-2">
        <select
          id={id}
          name={name}
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value={init}>{init}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PrinterInput({ label, id, printers, value, onChange, disabled = false, name }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 text-md font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="relative w-1/2 ml-2">
        <select
          id={id}
          name={name}
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Chọn máy in</option>
          {printers.map((printer, index) => (
            <option key={index} value={printer.Name}>
              {`${printer.Name} ${printer.Building} ${printer.RoomNumber}`}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NumberInput({ label, id, value, onChange, placeholder = '', disabled = false }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 text-md font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function PDFDisplay({ filePath }) {
  return (
    <div className="bg-white shadow-lg rounded-lg w-full md:w-4/5 h-[85vh] p-4">
      <object data={filePath} type="application/pdf" width="100%" height="100%">
        <p className="text-center text-gray-700">
          Alternative text - include a link{' '}
          <a href={filePath} className="text-blue-500 underline">
            to the PDF!
          </a>
        </p>
      </object>
    </div>
  );
}

export default function DocumentConfig() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const fileName = params.get('file');
  const filePath = `/src/assets/report.pdf`;
  const { user } = useAuth();

  const [printers, setPrinters] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [page, setPage] = useState(100);
  const [config, setConfig] = useState({
    printer: '',
    printStart: '',
    printEnd: '',
    printSides: '',
    paperSize: '',
    printCount: '',
    printOrientation: '',
    documentName: fileName,
    studentId: user.id,
  });

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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/print');
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig, [name]: value };
      if (newConfig.printSides === '2 mặt') {
        setPage((prevPage) => prevPage / 2);
      }
      return newConfig;
    });
  };

  const filteredPrinters = printers.filter((printer) => printer.CampusName === selectedCampus);

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mt-[70px]">
        <PDFDisplay filePath={filePath} />
        <div className="bg-white shadow-lg rounded-lg w-full md:w-1/2 h-[85vh] p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-1">Thiết lập cấu hình in</h2>
          <h3 className="text-base font-semibold mb-5 text-gray-500">
            Tổng số trang hiện tại: <span className="font-bold">{page}</span>
          </h3>
          <div className="space-y-5">
            <ConfigInput
              label="Cơ sở"
              id="campus"
              name="campus"
              init="Chọn cơ sở"
              options={[...new Set(printers.map((printer) => printer.CampusName))]}
              value={selectedCampus}
              onChange={(e) => {
                setSelectedCampus(e.target.value);
                setConfig((prevConfig) => ({
                  ...prevConfig,
                  printer: '',
                }));
              }}
            />
            <PrinterInput label="Máy in" id="printer" name="printer" printers={filteredPrinters} value={config.printer} onChange={handleConfigChange} disabled={!selectedCampus} />
            <NumberInput label="Trang bắt đầu" id="printRange" name="printRange" placeholder="Trang bắt đầu" value={config.printStart} onChange={handleConfigChange} />
            <NumberInput label="Trang kết thúc" id="printRange" name="printRange" placeholder="Trang kết thúc" value={config.printEnd} onChange={handleConfigChange} />
            <ConfigInput label="Số mặt in" init="Chọn số mặt in" id="printSides" name="printSides" options={['1 mặt', '2 mặt']} value={config.printSides} onChange={handleConfigChange} />
            <ConfigInput label="Khổ giấy" init="Chọn khổ giấy" id="paperSize" name="paperSize" options={['A3', 'A4']} value={config.paperSize} onChange={handleConfigChange} />
            <NumberInput label="Số lượng in" id="printCount" name="printCount" placeholder="Nhập số lượng in" value={config.printCount} onChange={handleConfigChange} />
            <ConfigInput
              label="Hướng in"
              init="Chọn hướng in"
              id="printOrientation"
              name="printOrientation"
              options={['Thẳng đứng', 'Ngang']}
              value={config.printOrientation}
              onChange={handleConfigChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-7">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400" onClick={handleCancel}>
              Quay lại
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}
