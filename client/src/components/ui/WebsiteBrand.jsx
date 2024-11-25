export default function WebsiteBrand({ onClick }) {
  return (
    <div className="flex items-center" onClick={onClick}>
      <img src="/src/assets/hcmut.png" alt="Logo" className="h-16" />
      <span className="text-blue-600 font-semibold cursor-pointer text-2xl">HCMUT SPSS</span>
    </div>
  );
}
