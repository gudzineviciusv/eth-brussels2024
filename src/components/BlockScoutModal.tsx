import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]); // Ensure transactions is properly typed
  const [modalWidth, setModalWidth] = useState<number | string>('sm:w-96'); // Initial width

  useEffect(() => {
    if (transactions.length > 0) {
      // Adjust modal width dynamically based on table content
      const tableWidth = document.getElementById('transactions-table')?.offsetWidth || 0;
      const adjustedWidth = Math.min(tableWidth + 64, 800); // Adjust max width as needed

      if (tableWidth > 400) {
        setModalWidth(`${adjustedWidth}px`);
      } else {
        setModalWidth('sm:w-96');
      }
    } else {
      // Reset modal width when no transactions
      setModalWidth('sm:w-96');
    }
  }, [transactions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;

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

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className={`relative bg-gray-900 p-8 rounded-lg shadow-lg max-w-full ${modalWidth}`}>
          <h2 className="text-xl font-bold mb-4 text-gray-300">Enter Wallet Address</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="walletAddress" className="block text-gray-400 font-bold">
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="border border-gray-700 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500 bg-gray-800 text-gray-300"
                placeholder="Enter your wallet address"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>

          {transactions.length > 0 && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold mb-2 text-gray-300">Transactions</h3>
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
