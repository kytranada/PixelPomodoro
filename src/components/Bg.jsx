import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 2s ease-out;
`;

const Bg = ({ backgroundImage }) => {
  const [currentImage, setCurrentImage] = useState(backgroundImage);
  const [showCurrent, setShowCurrent] = useState(true);

  useEffect(() => {
    if (backgroundImage !== currentImage) {
      setShowCurrent(false);

      const timer = setTimeout(() => {
        setCurrentImage(backgroundImage);
        setShowCurrent(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [backgroundImage, currentImage]);

  return (
    <BackgroundContainer>
      <Background
        style={{ backgroundImage: `url(${currentImage})` }}
        show={showCurrent}
      />
      <Background
        style={{ backgroundImage: `url(${backgroundImage})` }}
        show={!showCurrent}
      />
    </BackgroundContainer>
  );
};

export default Bg;
