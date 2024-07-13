import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-4 w-full">
      <div className="container mx-auto flex items-center justify-between px-8">
        <div className="text-white font-bold text-2xl">
          NFT <span className="text-purple-400">SEA</span>
        </div>
        <div className="text-gray-400">
          NFT Sea 2022 © All rights reserved
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Explore Marketplace
        </button>
      </div>
    </footer>
  );
};

export default Footer;
