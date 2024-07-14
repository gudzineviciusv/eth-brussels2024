'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import QRCodeComponent from '@/components/QRCodeComponent';
import useAccountManager from '@/hooks/useFuneral';
import AccountManagerABI from '@/web3/abi/ComeToMyFuneral.json';
import { useAccount } from 'wagmi';
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
        if (userAccount) {
            setAccount(userAccount);
            setQrLink(`${window.location.origin}/claim?walletAddress=${userAccount}`);
            checkNft(userAccount);
        }
     
    }, [userAccount]);

    // useEffect(() => {
    //     if (window.ethereum) {
    //         window.ethereum.request({ method: 'eth_requestAccounts' })
    //             .then((accounts: string[]) => {
    //                 setAccount(accounts[0]);
    //                 setQrLink(`${window.location.origin}/claim?walletAddress=${accounts[0]}`);
    //                 checkNft(accounts[0]);
    //             })
    //             .catch((err: Error) => {
    //                 setError('Please connect your wallet.');
    //                 console.error(err);
    //             });
    //     } else {
    //         setError('MetaMask is not installed.');
    //     }
    // }, []);

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
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {account && (
                        <div className="text-gray-300">
                            <p className="mb-4">Connected wallet: {account}</p>
                            {nftValid ? (
                                <div>
                                    <button
                                        onClick={handleReport}
                                        disabled={reporting || reported}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full mb-4"
                                    >
                                        {reporting ? 'Reporting...' : 'Report Death'}
                                    </button>
                                    {reported && (
                                        <div>
                                            <QRCodeComponent text={qrLink} />
                                            <p className="mt-4 text-center">
                                                Report successful!{' '}
                                                <a href={`/claim?walletAddress=${account}`} className="text-purple-500 underline">
                                                    Go to claim
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-red-500">No valid NFT found in your wallet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </BackgroundWrapper>
    );
};

export default ReportPage;
