import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const PomoText = styled.div`
  text-align: center;
  color: white;
  font-family: 'VT323';
  text-transform: uppercase;

  h1 {
    margin: 0;
    font-size: 30px;
  }
  p {
    margin: 0;
    font-size: 20px;
  }
  h2 {
    margin: 0;
    color: silver;
    font-size: 40px;
  }

  button:active {
    top: 2px;
  }
  button {
    margin: 6px;
    text-transform: uppercase;
    font-size: 15px;
    align-items: center;
    color: white;
    font-family: 'VT323';
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
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

const TimeDisplay = styled.div`
  font-size: 50px;
  color: white;
  font-family: 'VT323';
  text-align: center;
  position: relative;
`;

const TimeInput = styled.input`
  font-size: 50px;
  color: white;
  font-family: 'VT323';
  background: transparent;
  border: none;
  text-align: center;
  width: 120px;
  outline: none;
`;

const Pomo = ({}) => {
  const [time, setTime] = useState(25 * 60); // start at 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleTimeClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTime(Number(value) * 60);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return (
    <PomoText>
      <Draggable bounds='body'>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: 'transparent',
            //    backgroundColor: 'rgba(230, 230, 230, .3)',
            borderRadius: '120px',
            //   filter: 'drop-shadow(0 0 2px silver)',
            zIndex: 1000,
            maxWidth: '300px',
          }}
        >
          <h1>PixelPomo</h1>
          <p>
            Welcome to PixelPomo!
            <p>
              a Reactjs web app where you can manageme your time while lovely
              8bit gifs play in the background
            </p>
          </p>
          <TimeDisplay onClick={handleTimeClick}>
            {isEditing ? (
              <TimeInput
                type='text'
                value={minutes}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyUp={handleInputKeyPress}
                autoFocus
              />
            ) : (
              `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
            )}
          </TimeDisplay>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </Draggable>
    </PomoText>
  );
};

export default Pomo;
