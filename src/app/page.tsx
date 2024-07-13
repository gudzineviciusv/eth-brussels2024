import Footer from '@/components/Footer';
import MintNFTForm from '@/components/Form/MainForm';
import Header from '@/components/Header';
import BackgroundComponent from '@/components/wrappers/BackgroundWrapper';
import React from 'react';

const HomePage: React.FC = () => {
    return (
    <BackgroundComponent>
        <Header title={'Leave your crypto lagacy'} subtitle={'tbd'} />
        <MintNFTForm />
        <Footer />
    </BackgroundComponent>
    );
}

export default HomePage;