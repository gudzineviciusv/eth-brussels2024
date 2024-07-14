"use client";

import React, { useState } from 'react';
import BackgroundComponent from '@/components/wrappers/BackgroundWrapper';
import Header from '@/components/Header';
import MintNFTForm from '@/components/Form/MainForm';
import Footer from '@/components/Footer';
import Modal from '@/components/BlockScoutModal';
import ZerionPositionsModal from '@/components/ZerionPositionsModal';
import { useAccount } from 'wagmi';

import cryptoWillImage from '/public/assets/crypto-will-image.png';
import inheritorsListImage from '/public/assets/inheritors-list-image.png';
import ContentWrapper from '@/components/wrappers/ContentWrapper';

const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isZerionModalOpen, setIsZerionModalOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>('');

    const { address: wagmiWalletAddress } = useAccount();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openZerionModal = () => setIsZerionModalOpen(true);
    const closeZerionModal = () => setIsZerionModalOpen(false);

    const handleCheckWallet = () => {
        if (wagmiWalletAddress) {
            setWalletAddress(wagmiWalletAddress);
            openZerionModal();
        } else {
            alert('Please connect your wallet first.');
        }
    };

    return (
        <BackgroundComponent>
            <Header title={'Leave your crypto legacy'} subtitle={'Learn how it works bellow:'} />
            <ContentWrapper>
                <button className="image-button" onClick={handleCheckWallet}>
                    <img src="assets/crypto-will-image.png" alt="Crypto Will" style={{ width: '250px', height: 'auto' }} />
                    <div>Treasury</div>
                </button>

                <div className="w-full md:w-3/4 lg:w-1/2 px-20 py-8">
                    <MintNFTForm />
                </div>

                <button className="image-button" onClick={openModal}>
                    <img src="assets/inheritors-list-image.png" alt="Inheritors List" style={{ width: '130px', height: 'auto' }} />
                    <div>Recent transactions</div>
                </button>
            </ContentWrapper>

            {/* Modals */}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
            {isZerionModalOpen && <ZerionPositionsModal isOpen={isZerionModalOpen} onClose={closeZerionModal} walletAddress={walletAddress} />}

            <Footer />
        </BackgroundComponent>
    );
}

export default HomePage;
