'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import useAccountManager from '@/hooks/useFuneral';
import ContentWrapper from '@/components/wrappers/ContentWrapper';

const ClaimPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [isInWhitelist, setIsInWhitelist] = useState<boolean>(false);
    const [isInBlacklist, setIsInBlacklist] = useState<boolean>(false);
    const [claiming, setClaiming] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const { getMessage, claimFunds, getWhiteList, getBlackList } = useAccountManager();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts: string[]) => {
                    setAccount(accounts[0]);
                    checkStatus(accounts[0]);
                })
                .catch((err: Error) => {
                    setError('Claim assets that you inherited');
                    console.error(err);
                });
        } else {
            setError('MetaMask is not installed.');
        }
    }, []);

    const checkStatus = async (account: string) => {
        // TODO: rollback after testing
        setMessage('Bye mom');
        setIsInBlacklist(false);
        setIsInWhitelist(true);

        try {
            const message = await getMessage(account);
            setMessage(message);

            const whiteList = await getWhiteList();
            const blackList = await getBlackList();

            if (blackList.includes(account)) {
                setIsInBlacklist(true);
                setIsInWhitelist(false);
            } else if (whiteList.includes(account)) {
                setIsInWhitelist(true);
                setIsInBlacklist(false);
            } else {
                setError('Account is neither in whitelist nor in blacklist.');
            }
        } catch (err) {
            setError('Error checking status.');
            console.error(err);
        }
    };

    const handleClaim = async () => {
        setClaiming(true);
        try {
            await claimFunds();
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
            <Header title={'Claim Your Will'} subtitle={'Check if you inherited something'} />
            <ContentWrapper>
                {error && <div className="error">{error}</div>}
                {account && (
                    <div className="wallet-info">
                        <p>Connected wallet: {account}</p>
                        {message && <p>{message}</p>}
                        {isInWhitelist && (
                            <button className='px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full mb-4' onClick={handleClaim} disabled={claiming}>
                                {claiming ? 'Claiming...' : 'Claim Will'}
                            </button>
                        )}
                        {isInBlacklist && <p>You are in the blacklist and cannot claim the will.</p>}
                    </div>
                )}
            </ContentWrapper>
            <Footer />
        </BackgroundWrapper>
    );
};

export default ClaimPage;
