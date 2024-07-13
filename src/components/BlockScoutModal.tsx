import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { address: initialWalletAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [modalWidth, setModalWidth] = useState<number | string>('sm:w-96');

  useEffect(() => {
    if (transactions.length > 0) {
      const tableWidth = document.getElementById('transactions-table')?.offsetWidth || 0;
      const adjustedWidth = Math.min(tableWidth + 64, 800);

      if (tableWidth > 400) {
        setModalWidth(`${adjustedWidth}px`);
      } else {
        setModalWidth('sm:w-96');
      }
    } else {
      setModalWidth('sm:w-96');
    }
  }, [transactions]);

  const fetchTransactions = async (walletAddress: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`https://eth.blockscout.com/api/v2/addresses/${walletAddress}/transactions?filter=to%20%7C%20from`);
      const data = await response.json();

      if (data && data.items) {
        setTransactions(data.items);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Please check the console for more details.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialWalletAddress) {
      fetchTransactions(initialWalletAddress);
    }
  }, [isOpen, initialWalletAddress]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className={`relative bg-gray-900 p-8 rounded-lg shadow-lg max-w-full ${modalWidth}`}>
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                onClick={onClose}
                disabled={isLoading}
              >
                Close
              </button>
            </div>
          </div>

          {transactions.length > 0 && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold mb-2 text-gray-300">Wallet Transactions</h3>
              <div className="overflow-x-auto">
                <table id="transactions-table" className="min-w-full bg-gray-800 border border-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Date</th>
                      <th className="px-4 py-2 border-b border-gray-700 text-gray-300">To</th>
                      <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Value (ETH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{new Date(tx.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{tx.to.hash}</td>
                        <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{(tx.value / 1e18).toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
