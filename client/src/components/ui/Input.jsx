function Input({ type, label, name = '', placeholder = '', onChange = null, required = false }) {
  return (
    <div className="flex flex-col mb-[15px] relative w-full">
      <label className="text-md text-gray-700 font-semibold">{label}</label>
      <input className="w-full font-medium rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500" type={type} placeholder={placeholder} name={name} onChange={onChange} required={required} />
    </div>
  );
}

export default Input;
