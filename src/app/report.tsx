import Footer from '@/components/Footer';
import MintNFTForm from '@/components/Form/MainForm';
import MainHeaderBox from '@/components/MainHeaderBox';
import BackgroundComponent from '@/components/wrappers/BackgroundWrapper';
import React from 'react';

const HomePage: React.FC = () => {
    return (
    <BackgroundComponent>
        <MainHeaderBox />
        <MintNFTForm />
        <Footer />
    </BackgroundComponent>
    );
}

export default HomePage;