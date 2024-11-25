import { useState } from 'react';
import PurchaseForm from '../../components/purchase/PurchaseForm';
import PurchaseHistory from '../../components/purchase/PurchaseHistory';

export default function Purchase() {
  const [view, setView] = useState('form');

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="mb-6 fixed top-24">
        <button className={`px-4 py-2 mr-2 font-bold ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`} onClick={() => setView('form')}>
          Đơn thanh toán
        </button>
        <button className={`px-4 py-2 font-bold ${view === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`} onClick={() => setView('history')}>
          Lịch sử giao dịch
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center">{view === 'form' ? <PurchaseForm /> : <PurchaseHistory />}</div>
    </div>
  );
}
