import React from 'react';

export default function OrderFilter({ label, id, value, onChange, options, inputType, width }) {
  return (
    <div className={`flex ${width} items-center justify-center gap-1`}>
      <label className="block text-gray-700 text-sm font-bold">{label}</label>
      {inputType === 'select' ? (
        <select id={id} className="block appearance-none w-[200px] bg-gray-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight " value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type="date" id={id} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-2 rounded leading-tight" value={value} onChange={onChange} />
      )}
    </div>
  );
}
