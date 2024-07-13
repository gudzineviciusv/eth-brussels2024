import React from 'react';
import { useQRCode } from 'next-qrcode';

function QRCodeComponent({ text }: { text: string }) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={text}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}

export default QRCodeComponent;
