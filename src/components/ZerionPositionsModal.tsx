import React, { useState, useEffect } from 'react';

interface Position {
  token: string;
  balance: string;
  icon: string;
}

interface ZerionPositionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const ZerionPositionsModal: React.FC<ZerionPositionsModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      try {
        const proxyUrl = `https://proxy.cors.sh/`;
        const apiUrl = `https://api.zerion.io/v1/wallets/${walletAddress}/positions`;

        const response = await fetch(proxyUrl + apiUrl, {
          headers: {
            'x-api-key': 'temp_1a7abdafc066f83e2df563c06410435c',
            'Authorization': 'Basic ' + btoa('zk_dev_d8679fb297a247ba89c7589f8cea7464:qwer0poiu1'),
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPositions(data.data.map((item: any) => ({
            token: item.attributes.fungible_info.symbol,
            balance: item.attributes.quantity.float.toString(),
            icon: item.attributes.fungible_info.icon?.url || 'default-placeholder-url', // Use a default placeholder image URL
          })));
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

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg max-w-full w-full sm:w-2/3 lg:w-1/2">
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
                  <h3 className="text-lg font-bold mb-2 text-gray-300">YOUR WILL</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 border border-gray-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b border-gray-700 text-gray-300"></th>
                          <th className="px-4 py-2 border-b border-gray-700 text-gray-300"></th>
                          <th className="px-4 py-2 border-b border-gray-700 text-gray-300"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((position, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border-b border-gray-700 text-gray-300">
                              <img src={position.icon} alt={position.token} className="w-6 h-6 inline-block" />
                            </td>
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
    )
  );
};

export default ZerionPositionsModal;
