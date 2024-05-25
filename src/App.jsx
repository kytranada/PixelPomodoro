import React, { useState } from 'react';
import Bg from './components/Bg';
import Navbar from './components/Navbar';
import t1 from './assets/t1.gif';
import t2 from './assets/t2.gif';
import t3 from './assets/t3.gif';
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



const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(t1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gifs = [t1, t2, t3, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, t18, t19];

  const changeBackground = (newGif) => {
    setBackgroundImage(newGif);
    setIsMenuOpen(false); // Close the menu after selecting a background
  };

  return (
    <div className='app'>
      <Navbar gifs={gifs} changeBackground={changeBackground} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen}/>
     <div className={`blurStuff ${isMenuOpen ? 'blur' : ''}`}>
      < Bg backgroundImage={backgroundImage} />
      </div>
    </div>
  );
};

export default App;
