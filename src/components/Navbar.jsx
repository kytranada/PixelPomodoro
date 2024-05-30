import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 1000;
`;

const MenuIcon = styled.img`
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 2px silver);
  cursor: pointer;
`;

const Menu = styled.ul`
  list-style: none;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: absolute;
  top: 15px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  max-height: calc(100vh - 95px);
  overflow-y: auto;
  width: 100%;
  padding: 0px;
  z-index: 1001;
  flex-wrap: wrap;

  li {
    padding: 10px 0;
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

const Overlay = styled.div`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 998; /* Ensure overlay is below the menu */
`;

const Navbar = ({
  gifs,
  changeBackground,
  toggleMenu,
  isMenuOpen,
  toggleLoop,
  isLooping,
}) => {
  const handleToggleMenu = () => {
    toggleMenu();
  };

  const handleBackgroundChange = (gif) => {
    changeBackground(gif);
  };

  return (
    <div>
      <NavbarContainer>
        <MenuIcon src='/gear2.png' onClick={handleToggleMenu}></MenuIcon>
      </NavbarContainer>
      <Menu $isOpen={isMenuOpen}>
        {gifs.map((gif, index) => (
          <li key={index}>
            <Button onClick={() => handleBackgroundChange(gif)}>
              Background {index + 1}
            </Button>
          </li>
        ))}
        <li>
          <Button onClick={toggleLoop}>
            {isLooping ? 'Stop Loop' : 'Start Loop'}
          </Button>
        </li>
      </Menu>
      <Overlay $isOpen={isMenuOpen} onClick={handleToggleMenu} />
    </div>
  );
};

export default Navbar;
