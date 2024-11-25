function Button({ text, type, color = 'bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg hover:from-blue-600 hover:to-purple-800', onClick = null }) {
  return (
    <button type={type} onClick={onClick} className={`w-full ${color} text-white text-lg py-2 transition duration-300 rounded-lg`}>
      <p className="font-bold">{text}</p>
    </button>
  );
}

export default Button;
