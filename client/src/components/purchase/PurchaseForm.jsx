import { useState } from 'react';
import Button from '../ui/Button';

export default function PurchaseForm() {
  const [paper, setPaper] = useState(0);

  const handleChangePaper = (e) => {
    const value = e.target.value;
    setPaper(value);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Thanh toán</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
            Phương thức thanh toán
          </label>
          <select id="paymentMethod" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option>Thẻ tín dụng</option>
            <option>Chuyển khoản ngân hàng</option>
            <option>Ví điện tử</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Số lượng giấy (loại A4)
          </label>
          <input id="quantity" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChangePaper} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankAccount">
            Số tài khoản ngân hàng
          </label>
          <input id="bankAccount" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <p className="text-gray-700 text-sm">
            Tổng số tiền của bạn là: <span className="font-bold">{paper == 0 ? '' : `${paper * 500} VND`}</span>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button text={'Thanh toán'} type={'button'} />
        </div>
      </form>
    </div>
  );
}
