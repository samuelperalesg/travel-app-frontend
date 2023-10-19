import React from "react";
import { Link } from "react-router-dom";
import { useLocationContext } from "../context/LocationContext";
import { useUser } from "../context/UserContext";

function Timeline() {
  const {
    state: { locations = [], loading, error, defaultLocation },
  } = useLocationContext();

  const { state: userState = {} } = useUser();

  const LayeredBackground = () => {
    if (!defaultLocation) return null;

    return (
      <div
        className="layered-background"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url(${defaultLocation.imageUrl})`,
        }}
      ></div>
    );
  };

  const isEmptyLocations = () => {
    return locations.length === 0;
  };

  const renderLocations = () => {
    if (isEmptyLocations()) return null;

    return locations
      .filter(Boolean)
      .reverse()
      .map((location, index) => (
        <div
          key={location._id || `local-${index}`}
          className="timeline-pg-location"
        >
          <Link to={`/locations/${location._id}`}>
            <img
              className="timeline-pg-location-image"
              src={location.image}
              alt={location.name}
            />
          </Link>
          <h5 className="timeline-pg-location-name">{location.name}</h5>
        </div>
      ));
  };

  return (
    <>
      <LayeredBackground />
      <div className="timeline-pg-container">
        {error && <div>Error: {error}</div>}
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {!userState.loggedIn && !isEmptyLocations() && (
              <div className="login-message">
                Please login to save your locations.
              </div>
            )}
            {isEmptyLocations() ? (
              <div className="add-location-message">
                Add new locations from the 'Add Location' tab
              </div>
            ) : (
              <div className="timeline-pg-grid">{renderLocations()}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Timeline;
