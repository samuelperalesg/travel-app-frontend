import React from 'react';

function Footer() {
  return (
    <div id="footerContainer">
      <div id="footerHeader">
        <div id="logoAndName">
          <img src="https://i.imgur.com/950J1fr_d.webp?maxwidth=760&fidelity=grand" id="DumbbellImgFooter" />
          <h1 id="footerHeader">WORLD TRAVELER</h1>
        </div>
        <img src="https://i.imgur.com/0hmNIqq_d.webp?maxwidth=760&fidelity=grand" id="linkedinImg" onclick="linkedinButton()" />
        <img src="https://i.imgur.com/q4EQ4Me_d.webp?maxwidth=760&fidelity=grand" id="gitHubImg" onclick="gitHubButton()" />
        <p id="copyrightFooter">@2022 WorldTraveler, M.O. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
