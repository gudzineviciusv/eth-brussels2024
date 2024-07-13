'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';

// Temporary constants for testing
const reportContractAddress = '0xYourReportContractAddressHere'; // Replace with your contract address
const reportContractABI = [
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

const ReportPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [nftValid, setNftValid] = useState<boolean>(false);
    const [reporting, setReporting] = useState<boolean>(false);
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
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(reportContractAddress, reportContractABI, provider);
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

    const handleReport = async () => {
        setReporting(true);
        try {
            // Add logic to handle the report process
            // This might include interacting with another contract method
            alert('Death reported successfully!');
        } catch (err) {
            setError('Error reporting the death.');
            console.error(err);
        } finally {
            setReporting(false);
        }
    };

    return (
        <BackgroundWrapper>
            <Header title={'Report a Death'} subtitle={'Please connect your wallet to report a death'} />
            <div className="content">
                {error && <div className="error">{error}</div>}
                {account && (
                    <div className="wallet-info">
                        <p>Connected wallet: {account}</p>
                        {nftValid ? (
                            <button onClick={handleReport} disabled={reporting}>
                                {reporting ? 'Reporting...' : 'Report Death'}
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

export default ReportPage;
