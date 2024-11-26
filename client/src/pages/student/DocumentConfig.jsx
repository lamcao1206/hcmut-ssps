import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ConfigInput({ label, id, options }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="relative w-1/2 ml-2">
        <select id={id} className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
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

function RangeInput({ label, id }) {
  const [range, setRange] = useState('');

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center">
        <input type="text" id={id} value={range} onChange={handleRangeChange} className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="e.g., 1-5, 8, 11-13" />
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
  const params = new URLSearchParams(location.search);
  const fileName = params.get('file') || 'report.pdf'; // Default to 'report.pdf' if no file is specified
  const filePath = `/src/assets/report.pdf`;

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mt-[70px]">
        <PDFDisplay filePath={filePath} />
        <div className="bg-white shadow-lg rounded-lg w-full md:w-1/2 h-[85vh] p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-1">Thiết lập cấu hình in</h2>
          <h3 className="text-base font-semibold mb-5 text-gray-500">
            Tổng số trang hiện tại: <span className="font-bold">100</span>
          </h3>
          <div className="space-y-6">
            <ConfigInput label="Cơ sở" id="1" options={['Cơ sở 1', 'Cơ sở 2']} />
            <ConfigInput label="Máy in" id="2" options={['Máy in 1 B6 103', 'Máy in 2 B3 103', 'Máy in 3 B1 402']} />
            <RangeInput label="Số trang in" id="printRange" />
            <ConfigInput label="Số mặt in" id="3" options={['1 mặt', '2 mặt']} />
            <ConfigInput label="Khổ giấy" id="4" options={['A3', 'A4', 'Legal']} />
            <ConfigInput label="Số lượng in" id="6" options={[1, 2, 3]} />
            <ConfigInput label="Hướng in" id="5" options={['Thẳng đứng', 'Ngang']} />
          </div>
          <div className="flex justify-end gap-2 mt-14">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400">Quay lại </button>
            <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}
