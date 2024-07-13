import React from 'react';
import { ConnectKitButton } from 'connectkit';

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-8 w-full">
      <div className="text-white font-bold text-2xl">
        NFT <span className="text-purple-400">SEA</span>
      </div>
      <div className="flex items-center space-x-4 text-white">
        <a href="#" className="hover:underline">Explore Marketplace</a>
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default TopBar;
