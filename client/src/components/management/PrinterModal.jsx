import PrinterModalLabel from './PrinterModalLabel';

export default function PrinterModal({ title, printerInfor, handleChange, onClickCancel, onClickSubmit }) {
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
