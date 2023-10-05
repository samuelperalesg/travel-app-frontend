import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";

const pictures = [
  "https://wallup.net/wp-content/uploads/2016/02/193738-Maldives-beach-sea-nature.jpg",
  "https://i.imgur.com/E3dmGSp_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/UGymZ1a_d.webp?maxwidth=1520&fidelity=grand",
  "https://images2.alphacoders.com/458/458495.jpg",
  "https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg",
  "https://images3.alphacoders.com/750/75027.jpg",
  "https://free4kwallpapers.com/uploads/originals/2017/02/17/sunset-at-turnagain-arm-alaska-wallpaper.jpg",
  "https://free4kwallpapers.com/uploads/originals/2020/05/31/anchorage-alaska-wallpaper.jpg",
];

function App() {
  const [background] = useState(pictures[Math.floor(Math.random() * pictures.length)]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        setUser(user);
      } catch (err) {
        setError(err.message);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="App">
      <Nav user={user} />
      <Home id="home" img={background} user={user} alt="background vacation scene" />
    </main>
  );
}

export default App;
