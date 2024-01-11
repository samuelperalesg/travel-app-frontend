import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Timeline from "./pages/Timeline";
import Footer from "./components/Footer";
import Show from "./pages/Show";
import {
  LocationProvider,
  useLocationContext,
} from "./context/LocationContext";
import * as firebase from "./services/firebase";
import { UserProvider } from "./context/UserContext";
import rotatePhoneImage from './images/rotate_phone.png';

const pictures = [
  "https://images7.alphacoders.com/897/897065.jpg",
  "https://i0.wp.com/www.ramnathsaway.com/wp-content/uploads/2023/04/Hawaiian-Islands.png?resize=1080%2C608&ssl=1",
  "https://i.imgur.com/UGymZ1a_d.webp?maxwidth=1520&fidelity=grand",
  "https://images2.alphacoders.com/458/458495.jpg",
  "https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg",
  "https://images3.alphacoders.com/750/75027.jpg",
  "https://free4kwallpapers.com/uploads/originals/2017/02/17/sunset-at-turnagain-arm-alaska-wallpaper.jpg",
];

function AppRoutes({ user, background }) {
  const { state: locationState } = useLocationContext();

  if (!locationState || !locationState.locations) {
    return <div>Loading locations...</div>;
  }

  return (
    <Switch>
      <Route exact path="/">
        <Home img={background} />
      </Route>
      <Route
        path="/locations/:id"
        render={(props) => {
          return (
            <Show
              {...props}
              locations={locationState.locations}
              deleteLocation={locationState.removeLocation}
            />
          );
        }}
      />
      <Route path="/locations">
        <Timeline user={user} />
      </Route>
      <Route
        path="/create-location"
        render={(props) => (
          <Form {...props} createLocation={locationState.addLocation} />
        )}
      />
    </Switch>
  );
}

function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowOverlay(window.innerWidth < 500);
    };
    
    window.addEventListener('resize', checkWidth);
    checkWidth();
    
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const [background] = useState(
    pictures[Math.floor(Math.random() * pictures.length)]
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="App">
      {showOverlay && (
        <div id="rotate-overlay" className={showOverlay ? "show" : ""}>
          <div className="rotate-device">
            <img src={rotatePhoneImage} alt="Rotate Device" />
          </div>
        </div>
      )}

      <UserProvider value={{ state: { user: user, loggedIn: !!user } }}>
        <LocationProvider user={user}>
          <Nav user={user} />
          <AppRoutes user={user} background={background} />
          <Footer />
        </LocationProvider>
      </UserProvider>
    </main>
  );
}

export default App;
