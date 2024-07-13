import Footer from '@/components/Footer';
import MainForm from '@/components/Form/MainForm';
import MainHeaderBox from '@/components/MainHeaderBox';
import BackgroundWrapper from '@/components/wrappers/BackgroundWrapper';
import React from 'react';

const ReportPage: React.FC = () => {
    return (
    <BackgroundWrapper>
        <MainHeaderBox />
        <MainForm />
        <Footer />
    </BackgroundWrapper>
    );
}

export default ReportPage;