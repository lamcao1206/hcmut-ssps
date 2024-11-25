import RoleOption from './RoleOption';

function RoleSelector({ roles, setRole }) {
  return (
    <div className="h-full flex flex-col justify-center items-center m-[25px]">
      <h1 className="text-xl font-bold text-gray-500 mb-[10px]">Chọn vai trò của bạn</h1>
      {roles.map((role) => (
        <RoleOption key={role.name} role={role} setRole={setRole} />
      ))}
    </div>
  );
}

export default RoleSelector;
