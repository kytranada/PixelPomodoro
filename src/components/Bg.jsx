import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
`;

const Bg = ({ backgroundImage }) => {
  return <Background style={{ backgroundImage: `url(${backgroundImage})` }} />;
};

export default Bg;
