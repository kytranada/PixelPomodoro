import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DraggableDiv = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: transparent;
  border-radius: 120px;
  z-index: 1000;
  max-width: 100%;
  touch-action: none;
`;

const Draggable = ({ children, initialX, initialY }) => {
  const [position, setPosition] = useState({
    x: initialX || window.innerWidth / 2,
    y: initialY || window.innerHeight / 2,
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
    <DraggableDiv
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      y={position.y}
      x={position.x}
    >
      {children}
    </DraggableDiv>
  );
};

export default Draggable;
