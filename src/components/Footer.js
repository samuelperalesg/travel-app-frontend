import React from 'react';

function Footer() {
  return (
    <div id="footerContainer">
      <div id="footerHeader">
        <div id="leftColumn">
          <div id="logoAndName">
            <h1>WORLD TRAVELER</h1>
          </div>
          <div id="socialLinks">
            <a href="https://www.linkedin.com/in/samuelperalesg" target="_blank" rel="noopener noreferrer">
              <img src="https://i.imgur.com/0hmNIqq_d.webp?maxwidth=760&fidelity=grand" id="linkedinImg" alt="LinkedIn"/>
            </a>
            <a href="https://github.com/samuelperalesg/travel-app-frontend/" target="_blank" rel="noopener noreferrer">
              <img src="https://i.imgur.com/q4EQ4Me_d.webp?maxwidth=760&fidelity=grand" id="gitHubImg" alt="GitHub"/>
            </a>
          </div>
        </div>
        <p id="copyrightFooter">@2023 WorldTraveler</p>
      </div>
    </div>
  )
}

export default Footer;
