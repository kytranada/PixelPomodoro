import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';

const PomoText = styled.div`
  text-align: center;
  color: white;
  text-transform: uppercase;

  p {
    margin: 0;
    font-size: 45px;
  }
`;

const Button = styled.button`
  margin: 6px;
  text-transform: uppercase;
  font-size: 20px;
  color: white;
  font-family: 'VT323';
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 10px;
  background: black;
  z-index: 2;

  &:active {
    top: 2px;
  }
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    background: black;
    z-index: -1;
  }
  &::before {
    top: 10px;
    bottom: 10px;
    left: -10px;
    right: -10px;
  }
  &::after {
    top: 4px;
    bottom: 4px;
    left: -6px;
    right: -6px;
  }
`;

const TimeDisplay = styled.div`
  font-size: 50px;
  color: white;
  font-family: 'VT323';
  text-align: center;
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

const Pomo = () => {
  const [time, setTime] = useState(25 * 60 * 1000); // start at 25 minutes (in milliseconds)
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => setTime((prevTime) => prevTime - 10), 10); // decrease by 10ms
    } else if (!isActive && time !== 0) {
      clearInterval(timer);
    } else if (time === 0) {
      alert('Time is up!');
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const handleButtonClick = (action) => {
    if (action === 'start') setIsActive(true);
    if (action === 'stop') setIsActive(false);
    if (action === 'restart') {
      setIsActive(false);
      setTime(25 * 60 * 1000); // reset to 25 minutes
    }
  };

  const handleTimeClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const value = e.target.value.split(':');
    if (
      value.length === 2 &&
      /^\d*$/.test(value[0]) &&
      /^\d*$/.test(value[1])
    ) {
      const minutes = Number(value[0]);
      const seconds = Number(value[1]);
      setTime((minutes * 60 + seconds) * 1000); // convert minutes and seconds to milliseconds
    }
  };

  const handleInputBlur = () => setIsEditing(false);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') setIsEditing(false);
  };

  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <PomoText>
      <Draggable>
        <p>PixelPomodoro</p>
        <TimeDisplay onClick={handleTimeClick}>
          {isEditing ? (
            <TimeInput
              type='text'
              value={`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
          ) : (
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${
              milliseconds < 10 ? '0' : ''
            }${milliseconds}`
          )}
        </TimeDisplay>

        <Button onClick={() => handleButtonClick('start')}>Start</Button>
        <Button onClick={() => handleButtonClick('stop')}>Stop</Button>
        <Button onClick={() => handleButtonClick('restart')}>Restart</Button>
      </Draggable>
    </PomoText>
  );
};

export default Pomo;
