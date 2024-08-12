import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  padding: 24px;
  top: 0;
  z-index: 999;
`;

function ModeButton({ handleModeChange }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 10, background: 'red', color: 'white', fontSize: 24 }}>
      <Button onClick={handleModeChange}>CAMERA</Button>
    </div>
  );
}

export default ModeButton;