import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PomoText = styled.div`
  text-align: center;
  color: white;
  text-transform: uppercase;

  p {
    margin: 0;
    font-size: 45px;
  }
  button {
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
  }
  button:active {
    top: 2px;
  }
  button::before,
  button::after {
    content: '';
    display: block;
    position: absolute;
    background: black;
    z-index: -1;
  }
  button::before {
    top: 10px;
    bottom: 10px;
    left: -10px;
    right: -10px;
  }
  button::after {
    top: 4px;
    bottom: 4px;
    left: -6px;
    right: -6px;
  }
`;

const DraggableDiv = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: transparent;
  border-radius: 120px;
  z-index: 1000;
  max-width: 300px;
  touch-action: none;
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
  const [time, setTime] = useState(25 * 60); // start at 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleResize = () =>
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
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
      setTime(25 * 60);
    }
  };

  const handleTimeClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setTime(Number(value) * 60);
  };

  const handleInputBlur = () => setIsEditing(false);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') setIsEditing(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleDragStart = (startX, startY) => {
    const handleDragMove = (moveX, moveY) => {
      const newX = Math.max(0, Math.min(window.innerWidth, moveX - startX));
      const newY = Math.max(0, Math.min(window.innerHeight, moveY - startY));
      setPosition({ x: newX, y: newY });
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    const handleMouseMove = (e) => handleDragMove(e.clientX, e.clientY);
    const handleMouseUp = handleDragEnd;
    const handleTouchMove = (e) =>
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchEnd = handleDragEnd;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e) =>
    handleDragStart(e.clientX - position.x, e.clientY - position.y);
  const handleTouchStart = (e) =>
    handleDragStart(
      e.touches[0].clientX - position.x,
      e.touches[0].clientY - position.y
    );

  return (
    <PomoText>
      <DraggableDiv
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        y={position.y}
        x={position.x}
      >
        <p>PixelPomodoro!</p>
        <TimeDisplay onClick={handleTimeClick}>
          {isEditing ? (
            <TimeInput
              type='text'
              value={minutes}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              autoFocus
            />
          ) : (
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
          )}
        </TimeDisplay>
        <button onClick={() => handleButtonClick('start')}>Start</button>
        <button onClick={() => handleButtonClick('stop')}>Stop</button>
        <button onClick={() => handleButtonClick('restart')}>Restart</button>
      </DraggableDiv>
    </PomoText>
  );
};

export default Pomo;
