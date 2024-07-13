import React from 'react';

interface WhitelistInputProps {
    whitelist: string;
    onWhitelistChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const WhiteListInput: React.FC<WhitelistInputProps> = ({ whitelist, onWhitelistChange }) => {
    return (
        <div className="mb-6">
      <textarea
          className="w-full p-3 text-gray-200 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={5}
          placeholder="WhiteList addresses"
          value={whitelist}
          onChange={onWhitelistChange}
      />
        </div>
    );
};

export default WhiteListInput;
