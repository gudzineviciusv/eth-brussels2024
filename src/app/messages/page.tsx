'use client';

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import Select from 'react-select';
import OptionTypeBase from "react-select";
import ValueType from "react-select";
import useAccountManager from '@/hooks/useFuneral';

const recipients = [1, 2, 3];

interface RecipientOption extends OptionTypeBase {
    value: string;
    label: string;
    hasMessage: boolean;
}

const MessagesPage: React.FC = () => {
    const [selectedRecipient, setSelectedRecipient] = useState<RecipientOption | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ [key: string]: string }>({});
    const [ recipientOptions, setRecipientOptions ] = useState<RecipientOption[]>([]);
    const { getWhiteList, getBlackList, setMessage } = useAccountManager();


    useEffect(() => {
        const getRecipients = async () => {
            const whiteList = await getWhiteList() as string[];
            const blackList = await getBlackList() as string[];

            console.log('White list:', whiteList);
            console.log('Black list:', blackList);

            const blackListed = blackList.map((address: string) => {
                return {
                    value: address,
                    label: `Blacklisted ${address}`,
                    hasMessage: !!messages[address],
                };
            }) as unknown as RecipientOption[];

            const whiteListed = whiteList.map((address: string) => {
                return {
                    value: address,
                    label: `Whitelisted ${address}`,
                    hasMessage: !!messages[address],
                };
            }) as unknown as RecipientOption[];

            const recipients = blackListed.concat(whiteListed) as unknown as RecipientOption[];
                
            setRecipientOptions(recipients);
        }
        getRecipients();
    }, [messages]);


    const handleRecipientChange = (option: ValueType<RecipientOption>) => {
        const recipientOption = option as RecipientOption;
        setSelectedRecipient(recipientOption);
        setNewMessage(messages[recipientOption?.value] || '');
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };

    const saveMessage = () => {
        if (selectedRecipient) {
            setMessage(selectedRecipient.value, newMessage);
            console.log('Messages saved:', messages);
        }
    };


    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'black',
        }),
    };

    return (
        <BackgroundWrapper>
            <Header title="Messages" subtitle="Leave a message for recipients" />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-7xl mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Leave Messages for Your Recipients</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select Recipient
                        </label>
                        <Select
                            options={recipientOptions}
                            onChange={handleRecipientChange}
                            styles={customStyles}
                            placeholder="Select a recipient"
                            value={selectedRecipient}
                            formatOptionLabel={(option: RecipientOption) => (
                                <div className="flex justify-between items-center">
                                    {option.label}
                                    {option.hasMessage && (
                                        <span className="ml-2 text-green-500 font-bold">✓</span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    {selectedRecipient && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Message for {selectedRecipient.label}
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={newMessage}
                                onChange={handleMessageChange}
                                placeholder={`Leave a message for ${selectedRecipient.label}`}
                            />
                            <button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={saveMessage}
                            >
                                Save Message
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </BackgroundWrapper>
    );
};

export default MessagesPage;
