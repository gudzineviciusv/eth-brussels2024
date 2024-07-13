'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';

declare global {
    interface Window {
        ethereum: any;
    }
}

// Temporary constants for testing
const claimContractAddress = '0xYourClaimContractAddressHere'; // Replace with your contract address
const claimContractABI = [
    // Replace with your contract ABI
    // Example ABI:
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    }
];

const ClaimPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [nftValid, setNftValid] = useState<boolean>(false);
    const [claiming, setClaiming] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts: string[]) => {
                    setAccount(accounts[0]);
                    checkNft(accounts[0]);
                })
                .catch((err: Error) => {
                    setError('Please connect your wallet.');
                    console.error(err);
                });
        } else {
            setError('MetaMask is not installed.');
        }
    }, []);

    const checkNft = async (account: string) => {
        if (!account) return;
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(claimContractAddress, claimContractABI, provider);
            const balance = await contract.balanceOf(account);
            if (balance.gt(0)) {
                setNftValid(true);
            } else {
                setError('No valid NFT found in your wallet.');
            }
        } catch (err) {
            setError('Error checking NFT.');
            console.error(err);
        }
    };

    const handleClaim = async () => {
        setClaiming(true);
        try {
            // Add logic to handle the claim process
            // This might include interacting with another contract method
            alert('Will claimed successfully!');
        } catch (err) {
            setError('Error claiming the will.');
            console.error(err);
        } finally {
            setClaiming(false);
        }
    };

    return (
        <BackgroundWrapper>
            <Header title={'Claim Your Will'} subtitle={'Please connect your wallet to claim your will'} />
            <div className="content">
                {error && <div className="error">{error}</div>}
                {account && (
                    <div className="wallet-info">
                        <p>Connected wallet: {account}</p>
                        {nftValid ? (
                            <button onClick={handleClaim} disabled={claiming}>
                                {claiming ? 'Claiming...' : 'Claim Will'}
                            </button>
                        ) : (
                            <p>No valid NFT found in your wallet.</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </BackgroundWrapper>
    );
};

export default ClaimPage;
