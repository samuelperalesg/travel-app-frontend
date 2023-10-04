import { useState, useRef } from "react";
import { auth } from "./services/firebase";
import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";

// Random background images for homepage
const pictures = [
  "https://wallup.net/wp-content/uploads/2016/02/193738-Maldives-beach-sea-nature.jpg",
  "https://i.imgur.com/E3dmGSp_d.webp?maxwidth=760&fidelity=grand",
  "https://i.imgur.com/UGymZ1a_d.webp?maxwidth=1520&fidelity=grand",
  "http://www.kvsholidays.online/wp-content/uploads/2021/06/Maldives.jpeg",
  "https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg",
  "https://images3.alphacoders.com/750/75027.jpg",
  "https://free4kwallpapers.com/uploads/originals/2017/02/17/sunset-at-turnagain-arm-alaska-wallpaper.jpg",
  "https://free4kwallpapers.com/uploads/originals/2020/05/31/anchorage-alaska-wallpaper.jpg",
];

function App() {
  var [background, setBackground] = useState(
    "https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg"
  );

  useRef(() => {
    setBackground(
      (background = pictures[Math.floor(Math.random() * pictures.length)])
    );
  }, []);

  // use state for user
  const [user, setUser] = useState(null);

  useRef(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="App">
      <Nav user={user} />
      <Home id="home" img={background} user={user} alt=""/>
    </main>
  );
}

export default App;
