import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const PomoText = styled.div`
  text-align: center;
  color: white;
  text-transform: uppercase;

  p {
    margin: 0;
    font-size: 25px;
  }

  button:active {
    top: 2px;
  }
  button {
    text-transform: uppercase;
    font-size: 20px;
    align-items: center;
    color: white;
    font-family: 'VT323';
    position: relative;
    display: inline-block;
    vertical-align: top;
    z-index: 1;
  }

  button::before {
    content: '';
    display: block;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: -10px;
    right: -10px;
    background: black;
    z-index: -1;
  }

  button::after {
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: -6px;
    right: -6px;
    background: black;
    z-index: -1;
  }

  button {
    padding: 10px 10px;
    position: relative;
    background: black;
    width: auto;
    z-index: 2;
  }
`;

const Pomo = ({}) => {
  const [time, setTime] = useState(25 * 60); // start at 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(timer);
    } else if (time === 0) {
      // time's up, do something here
    }
    return () => clearInterval(timer); // cleanup on unmount
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <PomoText>
      <Draggable>
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '44%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '30px',
            boxShadow: '0 0 10px rgba (0, 0, 0, 10)',
            zIndex: 1000,
          }}
        >
          <p>PixelPomo</p>
          <p>This is a simple Pomodoro timer</p>
          <p>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</p>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </Draggable>
    </PomoText>
  );
};

export default Pomo;
