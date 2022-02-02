import React from 'react';
import FadeIn from 'react-fade-in';

function Home({img}) {
  return (
      <div style={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img}) top left / cover no-repeat`,
        color: 'rgba(241, 250, 238, 0.9)',
        letterSpacing: '2px',
        fontSize: '50px',
        fontFamily: `"Times New Roman", Times, serif`,
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
        <FadeIn transitionDuration="1250"><h1>WORLD TRAVELER</h1></FadeIn>
        <FadeIn transitionDuration="700"><p style={{fontSize: '25px'}} ><i>hand selected locations for you</i></p></FadeIn>
      </div>
  )
}

export default Home;
