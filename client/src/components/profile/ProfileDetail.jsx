export default function ProfileDetail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
