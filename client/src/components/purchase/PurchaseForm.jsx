import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

export default function PurchaseForm() {
  const { user, setUser } = useAuth();
  const [page, setPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Thẻ tín dụng');

  const handleChangePage = (e) => {
    setPage(e.target.value);
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('de-DE').format(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await axios.put(`http://localhost:3000/student/${user.id}`, {
      ...user,
      page: (Number.parseInt(user.page) + Number.parseInt(page)).toString(),
    });

    const response = await axios.post('http://localhost:3000/transaction', {
      userId: user.id,
      paymentMethod,
      amount: Number.parseInt(page) * 500,
      purchasedDate: new Date().toISOString(),
    });
    console.log(response.data);

    setUser(newUser.data);
    alert('Thanh toán thành công');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Thanh toán</h1>
      <p className="text-gray-700 text-sm mb-4 font-semibold">Lưu ý: 1 trang = 500 VND</p>
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
          <input id="quantity" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChangePage} />
        </div>
        <div className="mb-6">
          <p className="text-gray-700 text-sm">
            Tổng số tiền của bạn là: <span className="font-bold">{page == 0 ? '...' : `${formatCurrency(page * 500)} VND`}</span>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button text={'Thanh toán'} type={'button'} onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
