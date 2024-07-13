import React, { useState } from 'react';
import Footer from '@/components/Footer';
import MainHeaderBox from '@/components/MainHeaderBox';
import TopBar from '@/components/TopBar';
import BackgroundComponent from '@/components/wrappers/BackgroundWrapper';

const ReportPage: React.FC = () => {
  const [isWillDistributed, setIsWillDistributed] = useState(false);

  const reportDeath = () => {
    setIsWillDistributed(true);
  };

  return (
    <BackgroundComponent>
      <TopBar />
      <MainHeaderBox />
      <div style={{ padding: '20px' }}>
        <h1>Report Page</h1>
        <button onClick={reportDeath}>Report Death</button>
        {isWillDistributed && <p>The will has been distributed.</p>}
      </div>
      <Footer />
    </BackgroundComponent>
  );
};

export default ReportPage;
