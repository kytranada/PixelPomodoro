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
  filter: drop-shadow(0 0 0.1rem #e6e2d3);
  z-index: 1000;
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Menu = styled.ul`
  list-style: none;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
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

  button {
    font-size: 20px;
    color: black;
    font-family: 'VT323';
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-transform: uppercase;
    
    cursor: pointer;
    
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  button:active {
    top: 2px;
  }

button {
    position: relative;
    display: block;
    margin: 10px;
    font-family: 'VT323';
    text-transform: uppercase;
    font-size: 20px; // whole button size 
    color: white;
  }

  button::before {
        content: "";
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
        content: "";
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

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: trasnparent; 
  z-index: 998; /* Ensure overlay is below the menu */
`;


const Navbar = ({ gifs, changeBackground, toggleMenu, isMenuOpen }) => {
    const handleToggleMenu = () => {
      toggleMenu();
    };
  
    const handleBackgroundChange = (gif) => {
      changeBackground(gif);
    };
  
  
    return (
    <>
    <NavbarContainer>
      <MenuIcon img src="/gear2.png" onClick={handleToggleMenu}>
      </MenuIcon>
      </NavbarContainer>
      <Menu isOpen={isMenuOpen}>
        {gifs.map((gif, index) => (
          <li key={index}>
            <button onClick={() => handleBackgroundChange(gif)}>Background {index + 1}</button>
          </li>
        ))}
      </Menu>
    <Overlay isOpen={isMenuOpen} onClick={handleToggleMenu} />
    </>
  );
};

export default Navbar;
