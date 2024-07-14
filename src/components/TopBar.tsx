import React, { useState } from 'react';
import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

const TopBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isZerionModalOpen, setIsZerionModalOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>('');

    const { address: wagmiWalletAddress } = useAccount();

    const handleCheckWallet = () => {
        if (wagmiWalletAddress) {
            setWalletAddress(wagmiWalletAddress);
        } else {
            alert('Please connect your wallet first.');
        }
    };

    const menuItems = [
        { src: '/assets/crypto-will-image.png', alt: 'Crypto Will', href: '/', description: 'Crypto Will Treasury' },
        { src: '/assets/inheritors-list-image.png', alt: 'Inheritor list', href: '/messages', description: 'Inheritors List' },
        { src: '/assets/report.png', alt: 'Report', href: '/report', description: 'Report' },
        { src: '/assets/kubok.png', alt: '', href: '/', description: 'Achievements' },
        { src: '/assets/inheritors-list-image.png', alt: '', href: '/messages', description: 'Messages' },
    ];

    return (
        <div className="flex items-center justify-between px-8 w-full py-4 bg-black relative">
            <div className="flex items-center relative">
                <Link href="/" passHref>
                    <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-4 cursor-pointer" />
                </Link>
                <Link href="/about" passHref>
                    <div className="left-12 top-1/2 transform -translate-y-1/2 bg-white text-black text-xs p-2 rounded-lg shadow-md cursor-pointer">
                        Hey, learn more about how it works
                    </div>
                </Link>
            </div>
            <div className="flex-grow flex justify-center space-x-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Link href={item.href} passHref>
                            <img src={item.src} alt={item.alt} className="h-8 w-8 cursor-pointer mb-1" />
                        </Link>
                        <span className="text-xs text-gray-300">{item.description}</span>
                    </div>
                ))}
            </div>
            <div className="ml-auto">
                <ConnectKitButton />
            </div>
        </div>
    );
};

export default TopBar;
