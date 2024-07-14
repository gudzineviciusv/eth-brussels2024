'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import QRCodeComponent from '@/components/QRCodeComponent';
import useAccountManager from '@/hooks/useFuneral';
import AccountManagerABI from '@/web3/abi/ComeToMyFuneral.json';
import './report.scss'; // Import the SCSS file

const reportContractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

const ReportPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [nftValid, setNftValid] = useState<boolean>(false);
    const [reporting, setReporting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reported, setReported] = useState<boolean>(false);
    const [qrLink, setQrLink] = useState<string>('');

    const { account: userAccount, reportDeath } = useAccountManager();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts: string[]) => {
                    setAccount(accounts[0]);
                    setQrLink(`${window.location.origin}/claim?walletAddress=${accounts[0]}`);
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
        // TODO: rollback after testing
        setNftValid(true);

        // try {
        //     if (!process.env.NEXT_PUBLIC_NFT_ADDRESS) {
        //         throw new Error('Contract address is not defined');
        //     }

        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_ADDRESS, AccountManagerABI, provider);
        //     const balance = await contract.balanceOf(account);

        //     if (balance.gt(0)) {
        //         setNftValid(true);
        //         return;
        //     }

        //     setError('No valid NFT found in your wallet.');
        //     setNftValid(false);
        // } catch (err) {
        //     setError('Error checking NFT.');
        //     console.error(err);
        //     setNftValid(false);
        // }
    };

    const handleReport = async () => {
        setReporting(true);

        // TODO: rollback after testing
        setReported(true);

        try {
            await reportDeath();
            alert('Death reported successfully!');
            setReported(true);
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
                            <div>
                                <button onClick={handleReport} disabled={reporting || reported}>
                                    {reporting ? 'Reporting...' : 'Report Death'}
                                </button>
                                {reported && (
                                    <div>
                                        <QRCodeComponent text={qrLink} />
                                        <p>Report successful! <a href={`/claim?walletAddress=${account}`}>Go to claim</a></p>
                                    </div>
                                )}
                            </div>
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
