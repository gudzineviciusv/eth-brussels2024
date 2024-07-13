import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;

    setIsLoading(true);

    try {
      const response = await fetch(`https://eth.blockscout.com/api/v2/addresses/${walletAddress}/transactions?filter=to%20%7C%20from`);
      const data = await response.json();
      console.log('API Response:', data);

      setTransactions(data.items);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Please check the console for more details.');
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-lg">
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
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2 text-gray-300">Transactions</h3>
              <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Date</th>
                    <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Gas Price (Gwei)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{(tx.gas_price / 1e9).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
