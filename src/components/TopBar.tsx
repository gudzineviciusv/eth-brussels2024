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
        { src: '/assets/crypto-will-image.png', alt: 'Crypto Will', href: '/page1', description: 'Crypto Will' },
        { src: '/assets/inheritors-list-image.png', alt: 'Inheritor list', href: '/page2', description: 'Inheritors List' },
        { src: '/assets/report.png', alt: 'Report', href: '/page3', description: 'Report' },
        { src: '/assets/kubok.png', alt: '', href: '/page4', description: 'Achievements' },
        { src: '/assets/crypto-will-image.png', alt: '', href: '/page5', description: 'Settings' },
    ];

    return (
        <div className="flex items-center justify-between px-8 w-full py-4">
            <div className="flex items-center">
                <Link href="/" passHref>
                    <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-4 cursor-pointer" />
                </Link>
            </div>
            <div className="flex-grow flex justify-center space-x-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Link href={item.href} passHref>
                            <img src={item.src} alt={item.alt} className="h-8 w-8 cursor-pointer mb-1" />
                        </Link>
                        <span className="text-xs text-gray-700">{item.description}</span>
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
