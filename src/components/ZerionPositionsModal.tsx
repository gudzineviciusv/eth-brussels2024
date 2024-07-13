import React, { useState, useEffect } from 'react';

interface ZerionPositionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const ZerionPositionsModal: React.FC<ZerionPositionsModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/positions?walletAddress=${walletAddress}`);
        const data = await response.json();
        if (response.ok) {
          setPositions(data.positions);
        } else {
          console.error('Failed to fetch positions:', data);
          alert('Failed to fetch positions. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
        alert('Failed to fetch positions. Please check the console for more details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && walletAddress) {
      fetchPositions();
    }
  }, [isOpen, walletAddress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg max-w-full sm:w-96">
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

            {positions.length > 0 && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2 text-gray-300">Wallet Positions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-800 border border-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Token</th>
                        <th className="px-4 py-2 border-b border-gray-700 text-gray-300">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((position, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{position.token}</td>
                          <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{position.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ZerionPositionsModal;
