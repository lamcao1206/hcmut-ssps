export default function PurchaseHistory() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Lịch sử mua hàng</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-2 border-b">ID</th>
            <th className="py-2 px-2 border-b">Ngày giao dịch</th>
            <th className="py-2 px-2 border-b">Phương thức thanh toán</th>
            <th className="py-2 px-2 border-b">Số lượng</th>
            <th className="py-2 px-2 border-b">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="py-2 px-2 border-b">1</th>
            <td className="py-2 px-4 border-b">01/01/2023</td>
            <td className="py-2 px-4 border-b">Ví điện tử</td>
            <td className="py-2 px-4 border-b">10</td>
            <td className="py-2 px-4 border-b">100.000VND</td>
          </tr>
          <tr>
            <th className="py-2 px-2 border-b">2</th>
            <td className="py-2 px-4 border-b">02/01/2023</td>
            <td className="py-2 px-4 border-b">Ví điện tử</td>
            <td className="py-2 px-4 border-b">5</td>
            <td className="py-2 px-4 border-b">50.000VND</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
