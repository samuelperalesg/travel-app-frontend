import React from 'react';
import FadeIn from 'react-fade-in';

function Nav() {
  return (
    <nav style={{
      color: '#333333',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '10%',
      backgroundColor: '#f1faee',
    }}>
      <FadeIn transitionDuration="1000"><a href="#"><b>HOME</b></a></FadeIn>
      <FadeIn transitionDuration="1000"><a href="#"><b>LOCATIONS</b></a></FadeIn>
      <FadeIn transitionDuration="1000"><a href="#"><b>LOGIN</b></a></FadeIn>
    </nav>
  )
}

export default Nav;
