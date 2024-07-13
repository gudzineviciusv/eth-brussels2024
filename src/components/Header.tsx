import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-black bg-opacity-30 rounded-lg border border-gray-500">
        <h1 className="text-4xl font-bold text-white mb-4 text-center gradient-text">{title}</h1>
        <p className="text-gray-300 text-center">{subtitle}</p>
      </div>
    );
};

export default Header;
