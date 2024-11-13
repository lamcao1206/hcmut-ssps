const teamMembers = [
  {
    name: 'Cao Ngọc Lâm',
    role: 'Project Leader & Front End Developer',
    description: 'Responsible for UI Design and team leading',
    image: '/src/assets/lam.jpg',
  },
  {
    name: 'Đặng Ngọc Phú',
    role: 'Back End Developer',
    description: 'Back End Developer',
    image: '/src/assets/phu.png',
  },
  {
    name: 'Đặng Minh Khang',
    role: 'Back End Developer',
    description: 'Back End Developer',
    image: '/src/assets/avatar.png',
  },
  {
    name: 'Đoàn Anh Quang',
    role: 'Back End Developer',
    description: 'Back End Developer',
    image: '/src/assets/avatar.png',
  },
];

export default function AboutTeam() {
  return (
    <article className="p-8 flex flex-col justify-center items-center mb-[5rem] bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-xl" id="about-us">
      <h2 className="text-center font-semibold text-4xl mb-4 text-blue-600">Về chúng tôi</h2>
      <p className="text-xl text-gray-700 text-center mb-8 max-w-2xl">Chúng tôi là nhóm sinh viên CC03-01 từ lớp CC03 bộ môn Công Nghệ Phần Mềm học kì 241</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white" />
              <h4 className="text-xl font-semibold mb-2 text-white">{member.name}</h4>
              <p className="text-gray-200 mb-2">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
