import React, {useState, useEffect} from 'react';
import Home from './components/home';
import Nav from './components/nav';
import Footer from './components/footer';
import Show from './components/show';
import Login from './components/login';
import SignUp from './components/signup';
import './App.css';

// Random background images for homepage
const pictures = ["https://wallup.net/wp-content/uploads/2016/02/193738-Maldives-beach-sea-nature.jpg", "https://i.imgur.com/E3dmGSp_d.webp?maxwidth=760&fidelity=grand", "https://i.imgur.com/UGymZ1a_d.webp?maxwidth=1520&fidelity=grand", "http://www.kvsholidays.online/wp-content/uploads/2021/06/Maldives.jpeg", "https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg","https://images3.alphacoders.com/750/75027.jpg", "https://free4kwallpapers.com/uploads/originals/2017/02/17/sunset-at-turnagain-arm-alaska-wallpaper.jpg", "https://free4kwallpapers.com/uploads/originals/2020/05/31/anchorage-alaska-wallpaper.jpg"];

function App() {
  var [background, setBackground] = useState("https://images.hdqwalls.com/download/maldives-tl-2880x1800.jpg");

  useEffect(()=>{
    setBackground(background = pictures[Math.floor(Math.random() * pictures.length)]);
  },[]);

  return (
    <main>
      <Nav />
      {/*<Home id="home" img={background} />*/}
      {/* <Show /> */}
      {/* <Login /> */}
      <SignUp />
      <Footer />
    </main>
  );
}

export default App;
