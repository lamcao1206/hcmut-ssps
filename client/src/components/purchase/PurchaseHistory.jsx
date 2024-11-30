import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const TransactionRecord = ({ transaction }) => {
  return (
    <tr>
      <th className="py-2 px-2 border-b">{transaction.id}</th>
      <td className="py-2 px-4 border-b">{new Date(transaction.purchasedDate).toLocaleDateString()}</td>
      <td className="py-2 px-4 border-b">{transaction.paymentMethod}</td>
      <td className="py-2 px-4 border-b">{transaction.amount / 500}</td>
      <td className="py-2 px-4 border-b">{transaction.amount.toLocaleString('de-DE')} VND</td>
    </tr>
  );
};

export default function PurchaseHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transaction?userId=${user.id}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user.id]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Lịch sử mua hàng</h1>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">Không có giao dịch nào được tìm thấy.</p>
      ) : (
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
            {transactions.map((transaction) => (
              <TransactionRecord key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
