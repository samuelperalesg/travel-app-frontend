import React, { useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useUser } from "../context/UserContext";
import { useLocationContext } from "../context/LocationContext";
import { fetchLocation } from "../helpers/fetchLocation";

function Home(props) {
  const { state, actions } = useLocationContext();
  const { user } = useUser();
  const location = state.defaultLocation;

  const fetchAndSetLocation = async () => {
    const fetchedLocation = await fetchLocation();
    actions.setDefaultLocation(fetchedLocation);
  };

  useEffect(() => {
    if (!location || !location.imageUrl) {
      fetchAndSetLocation();
    }
  }, [location]);
  

  const reloadLocations = useCallback(() => {
    actions.reloadLocations();
  }, [actions]);

  useEffect(() => {
    if (user) {
      reloadLocations();
    }
  }, [user, reloadLocations]);

  const locationDataForForm = {
    formType: "new",
    data: location,
  };

  const handleAddLocationClick = () => {
    props.history.push("/create-location", {
      locationData: locationDataForForm,
    });
    window.scrollTo(0, 0);
  };

  const LayeredBackground = () => (
    <div
      className="layered-background"
      style={{
        backgroundImage: location && location.imageUrl
          ? `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url(${location.imageUrl})`
          : "none",
      }}
    ></div>
  );
  

  return (
    <>
      <LayeredBackground />
      <div className={`home-background`}>
        <div
          className="home-background-image"
          style={{ backgroundImage: `url(${props.img})` }}
        ></div>
        <FadeIn className="home-title">
          <h1> WORLD TRAVELER </h1>
        </FadeIn>
        <FadeIn className="home-subtitle">
          <p>
            <i> hand selected locations for you </i>
          </p>
        </FadeIn>
        <FadeIn>
          <div className="floating-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="22"></circle>
              <path d="M24 12v24M14 26l10 10 10-10"></path>
            </svg>
          </div>
        </FadeIn>
      </div>
      <div className="rec-section">
        <h2 className="rec-title">Our Destination Recommendation</h2>
        {!location ? (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
) : (
  <>
    <div className="rec-content">
      <img
        src={location.imageUrl} 
        alt={location.name}
        className="rec-image"
      />
      <div className="add-icon" onClick={handleAddLocationClick}>
        +
      </div>
    </div>
    <p className="rec-destination-name">{location.name}</p>
  </>
)}

      </div>
    </>
  );
}

export default withRouter(Home);
