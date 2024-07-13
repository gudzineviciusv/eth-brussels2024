import React from 'react';

interface FuneralAdminInputProps {
    publicAddress: string;
    onPublicAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FuneralAdminInput: React.FC<FuneralAdminInputProps> = ({ publicAddress, onPublicAddressChange }) => {
    return (
        <div className="mb-6">
            <input
                className="w-full p-3 text-gray-200 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                type="text"
                placeholder="Funeral Admin Address"
                value={publicAddress}
                onChange={onPublicAddressChange}
            />
        </div>
    );
};

export default FuneralAdminInput;
