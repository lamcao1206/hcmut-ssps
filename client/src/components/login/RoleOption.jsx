function RoleOption({ role, setRole }) {
  return (
    <div
      className="p-2 border border-gray-300 w-full rounded-lg mb-[5px] hover:bg-gray-200 cursor-pointer"
      onClick={() => setRole(role.name)}
    >
      <p className="text-center font-medium">{role.description}</p>
    </div>
  );
}

export default RoleOption;
