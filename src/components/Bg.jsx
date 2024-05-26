import React from 'react';

const Bg = ({ backgroundImage }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    ></div>
  );
};

export default Bg;
