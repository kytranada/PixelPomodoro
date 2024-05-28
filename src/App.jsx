import React, { useState, useEffect } from 'react';
import Pomo from './components/Pomo';
import Bg from './components/Bg';
import Navbar from './components/Navbar';
import t1 from './assets/t1.gif';
import t2 from './assets/t2.gif';
import t3 from './assets/t3.gif';
import t4 from './assets/t4.gif';
import t5 from './assets/t5.gif';
import t6 from './assets/t6.gif';
import t7 from './assets/t7.gif';
import t8 from './assets/t8.gif';
import t9 from './assets/t9.gif';
import t10 from './assets/t10.gif';
import t11 from './assets/t11.gif';
import t12 from './assets/t12.gif';
import t13 from './assets/t13.gif';
import t14 from './assets/t14.gif';
import t15 from './assets/t15.gif';
import t16 from './assets/t16.gif';
import t17 from './assets/t17.gif';
import t18 from './assets/t18.gif';
import t19 from './assets/t19.gif';
import t20 from './assets/t20.gif';

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(t3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [loopInterval, setLoopInterval] = useState(null);

  const gifs = [
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
    t7,
    t8,
    t9,
    t10,
    t11,
    t12,
    t13,
    t14,
    t15,
    t16,
    t17,
    t18,
    t19,
    t20,
  ];

  useEffect(() => {
    alert(`
      Welcome to PixelPomodoro!
      Click on the gear icon to change the background.
      Click on the clock to start or edit the timer.
      PS - You can move the timer around by dragging it!
    `);
  }, []);

  // Preload all images
  useEffect(() => {
    gifs.forEach((gif) => {
      new Image().src = gif;
    });
  }, [gifs]);

  const changeBackground = (newGif) => {
    setBackgroundImage(newGif);
    setIsMenuOpen(false); // Close the menu after selecting a background
  };

  const startLoop = () => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => {
        const currentIndex = gifs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % gifs.length;
        return gifs[nextIndex];
      });
    }, 5000);
    setLoopInterval(interval);
  };

  const stopLoop = () => {
    if (loopInterval) {
      clearInterval(loopInterval);
      setLoopInterval(null);
    }
  };

  const toggleLoop = () => {
    if (isLooping) {
      stopLoop();
    } else {
      startLoop();
    }
    setIsLooping(!isLooping);
  };

  return (
    <div className='app'>
      <Navbar
        gifs={gifs}
        changeBackground={changeBackground}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        toggleLoop={toggleLoop}
        isLooping={isLooping}
      />
      <div className={`blurStuff ${isMenuOpen ? 'blur' : ''}`}>
        alert('Time is up!');
        <Pomo />
        <Bg backgroundImage={backgroundImage} />
      </div>
    </div>
  );
};

export default App;
