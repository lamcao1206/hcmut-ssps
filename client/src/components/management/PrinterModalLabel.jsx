export default function PrinterModalLabel({ id, name, type = 'text', value, onChange }) {
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
