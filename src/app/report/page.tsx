import Footer from '@/components/Footer';
import MainForm from '@/components/Form/MainForm';
import Header from '@/components/Header';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import React from 'react';

const ReportPage: React.FC = () => {
    return (
    <BackgroundWrapper>
        <Header title={'Mint New NFT'} subtitle={'tbd'} />
        <MainForm />
        <Footer />
    </BackgroundWrapper>
    );
}

export default ReportPage;