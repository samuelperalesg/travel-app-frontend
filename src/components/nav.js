import { login as firebaseLogin, logout as firebaseLogout } from '../services/firebase';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

function Nav({ user }) {
  const handleLogin = async () => {
    try {
      await firebaseLogin();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="nav-navbar">
      <div className="nav-content">
        <ul className="nav-link-list">
          <li className="nav-link-item">
            <Link to="/" className="nav-text-link">
              <FadeIn transitionDuration="1000">HOME</FadeIn>
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/locations" className="nav-text-link">
              <FadeIn transitionDuration="1000">LOCATIONS</FadeIn>
            </Link>
          </li>
        </ul>

        {user ? (
          <div className="nav-user-section">
            <h4 className="nav-user-name">Welcome, {user.displayName}</h4>
            <img 
              src={user.photoURL} 
              className="nav-userImage" 
              alt="User Profile"
            />
            <FadeIn transitionDuration="1000">
              <button className='nav-login-logout-btn' onClick={handleLogout}>LOGOUT</button>
            </FadeIn>
          </div>
        ) : (
          <FadeIn transitionDuration="1000">
            <button className='nav-login-logout-btn' onClick={handleLogin}>LOGIN</button>
          </FadeIn>
        )}
      </div>
    </nav>
  );
}

export default Nav;
