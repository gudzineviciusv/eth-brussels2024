import React from 'react';

interface BlackListInputProps {
    blacklist: string;
    onBlackListChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BlacklistInput: React.FC<BlackListInputProps> = ({ blacklist, onBlackListChange }) => {
    return (
        <div className="mb-6">
            <textarea
                className="w-full p-3 text-gray-200 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={5}
                placeholder="Blacklist addresses"
                value={blacklist}
                onChange={onBlackListChange}
            />
        </div>
    );
};

export default BlacklistInput;
