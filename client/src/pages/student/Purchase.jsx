import { useState } from 'react';
import PurchaseForm from '../../components/purchase/PurchaseForm';
import PurchaseHistory from '../../components/purchase/PurchaseHistory';

export default function Purchase() {
  const [view, setView] = useState('form');

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-start items-center">
      <div className="mt-[120px]">
        <button className={`w-18 px-4 py-2 mr-2 font-bold ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`} onClick={() => setView('form')}>
          Đơn thanh toán
        </button>
        <button className={`w-18 px-4 py-2 font-bold ${view === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`} onClick={() => setView('history')}>
          Lịch sử giao dịch
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-[40px]">{view === 'form' ? <PurchaseForm /> : <PurchaseHistory />}</div>
    </div>
  );
}
