const getStatusClass = (status) => {
  switch (status) {
    case 'Hoàn thành':
      return 'bg-green-500 text-white';
    case 'Đang in':
      return 'bg-blue-500 text-white';
    case 'Đã huỷ':
      return 'bg-red-500 text-white';
    default:
      return 'bg-red-200 text-black';
  }
};

export default function StatusInfo({ status }) {
  const statusClass = getStatusClass(status);
  return (
    <span className={`rounded-lg font-bold px-[10px] py-[5px] text-center ${statusClass}`} style={{ display: 'inline-block', width: '120px' }}>
      {status}
    </span>
  );
}
