'use client';

import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';

const About: React.FC = () => {
    return (
        <BackgroundWrapper>
            <Header title="Your Funeral Balance Moderator" subtitle="" />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-gray-700 text-4xl font-bold mb-10">Your Funeral Balance Moderator</h1>

                {/* Project Photo */}
                <div className="flex justify-center mb-10">
                    <img src="/image.png" alt="Project Photo" className="rounded-lg shadow-lg max-w-full h-auto" />
                </div>

                {/* Functionality and Photos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
                    {/* Functionality Block 1 */}
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">Assigning a "Dead Moderator"</h2>
                        <p className="text-gray-700">
                            Choose a trusted friend or family member to act as your "Dead Moderator." This person has the
                            solemn duty of confirming your departure from this world. Select your trusted ‘Dead Moderator’ — 
                            because nothing says ‘I trust you’ like assigning someone to declare you officially deceased. 
                            This chosen one will trigger a smart contract that sets off the chain of events ensuring your 
                            financial legacy is handled. Think of it as giving someone the keys to your posthumous kingdom!
                        </p>
                    </div>
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/deadmoderator.png" alt="Functionality 1 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>

                    {/* Functionality Block 2 */}
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">Triggering the Death Announcement</h2>
                        <p className="text-gray-700">
                            Upon your death, the "Dead Moderator" activates a smart contract that informs the blockchain and
                            your designated recipients. When you kick the bucket, your ‘Dead Moderator’ will press the big red 
                            button—well, it’s not actually red, but you get the idea. This triggers a smart contract that spreads 
                            the word (on the blockchain) that you've shuffled off this mortal coil. No telegrams needed here!
                        </p>
                    </div>
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/redbutton.png" alt="Functionality 2 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>

                    {/* Functionality Block 3 */}
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/timer.png" alt="Functionality 3 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">The Grace Period Timer</h2>
                        <p className="text-gray-700">
                            Oops, false alarm! In case your ‘Dead Moderator’ got trigger-happy, there's a built-in timer giving you 
                            a window to say, ‘I’m not dead yet!’ If you’re alive and kicking, you can cancel the death announcement 
                            before it’s too late.
                        </p>
                    </div>

                    {/* Functionality Block 4 */}
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">Creating a Whitelist</h2>
                        <p className="text-gray-700">
                            Compile your VIP list! As the wallet owner, you can create a whitelist of folks who will inherit your crypto 
                            treasures. Specify who gets what—whether it’s your best friend, your sibling, or even your favorite barista. 
                            Spread the wealth with personalized allocations!
                        </p>
                    </div>
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/vip.png" alt="Functionality 4 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>

                    {/* Functionality Block 5 */}
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/goodbye.png" alt="Functionality 5 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">Assigning Tokens and Goodbye Messages</h2>
                        <p className="text-gray-700">
                            Parting is such sweet sorrow. Assign specific tokens and amounts to each wallet on your whitelist, and leave them 
                            a special goodbye message. Whether it’s heartfelt words of wisdom or a witty one-liner, your legacy will live on 
                            with a personal touch.
                        </p>
                    </div>

                    {/* Functionality Block 6 */}
                    <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/final.png" alt="Functionality 6 Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>
                    <div className="col-span-1 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">The QR Code Funeral Finale</h2>
                        <p className="text-gray-700">
                            Here’s where it gets high-tech. Once your ‘Dead Moderator’ confirms your passing, a QR code is generated. Print this code 
                            and attach it to your coffin—yes, you read that right. Mourners will scan the QR code at your funeral, sign a transaction 
                            with their wallets, and voila! The smart contract verifies their identity and sends them their assigned tokens. It’s like a 
                            final parting gift, with a touch of crypto magic!
                        </p>
                    </div>

                    {/* Team Section */}
                    <div className="col-span-1 md:col-span-2 p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-700 text-xl font-bold mb-2">Team Description</h2>
                        <p className="text-gray-700">
                            Meet our amazing team! We are a group of dedicated professionals with a passion for innovation and blockchain technology. 
                            Our goal is to make sure your financial legacy is secure and properly managed even after you are no longer around.
                        </p>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                        <img src="/team-photo.png" alt="Team Photo" className="object-cover rounded-lg shadow-md max-w-full h-auto"/>
                    </div>
                </div>
            </div>
            <Footer />
        </BackgroundWrapper>
    );
}

export default About;
