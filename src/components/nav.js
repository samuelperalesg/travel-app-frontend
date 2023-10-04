import { login, logout } from '../services/firebase'
import { Link } from 'react-router-dom'
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

      <Link to="/">
        <FadeIn transitionDuration="1000"><a href="#"><b>HOME</b></a></FadeIn>
      </Link>

      <Link to="/locations">
        <FadeIn transitionDuration="1000"><a href="#"><b>LOCATIONS</b></a></FadeIn>
      </Link>

      {
        props.user ?
        <>
        <h4>Welcome, {props.user.displayName}</h4>
        <img src={props.user.photoURL} style={{ height: "5rem", borderRadius: "50%",}} alt=''/>
        <FadeIn transitionDuration="1000"><a href="#" onClick={logout} ><b>LOGOUT</b></a></FadeIn>
        </>
        :
        <FadeIn transitionDuration="1000"><a href="#" onClick={login} ><b>LOGIN</b></a></FadeIn>
      }
    </nav>
  )
}

export default Nav;
