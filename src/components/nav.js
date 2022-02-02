import React from 'react';
import { login, logout } from '../services/firebase'
import FadeIn from 'react-fade-in';

function Nav(props) {
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
      {
        props.user ?
        <>
        <h4>Welcome, {props.user.displayName}</h4>
        <img src={props.user.photoURL}/>
        <FadeIn transitionDuration="1000"><a href="#" onClick={logout} ><b>LOGOUT</b></a></FadeIn>
        </>
        :
        <FadeIn transitionDuration="1000"><a href="#" onClick={login} ><b>LOGIN</b></a></FadeIn>
      }
    </nav>
  )
}

export default Nav;
