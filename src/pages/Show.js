import React from "react";
import PropTypes from "prop-types";
import FadeIn from "react-fade-in";
import { useLocationContext } from "../context/LocationContext";
import { useUser } from "../context/UserContext";

function Show({ match, history }) {
  const userContext = useUser();
  const isLoggedIn = userContext?.state?.loggedIn;

  const { state: locationState, actions } = useLocationContext();
  const locationId = match?.params?.id;

  if (!Array.isArray(locationState.locations)) {
    return <div>Loading...</div>;
  }

  if (locationState.loadingFromBackend) {
    return <div>Loading from backend...</div>;
  }

  if (locationState.loadingFromSession) {
    return <div>Loading from session...</div>;
  }

  let location = locationState.locations?.find((l) => l._id === locationId);

  if (!location) {
    return <div>Location not found!</div>;
  }

  const removeLocation = async () => {
    try {
      await actions.removeLocation(location._id);
      actions.reloadLocations();
      history.push("/locations");
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const LayeredBackground = () => (
    <div
      className="layered-background"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url(${location.image})`,
      }}
    ></div>
  );

  return (
    <>
      <LayeredBackground />
      <button
        className="show-pg-back-btn"
        onClick={() => history.push("/locations")}
      >
        Back
      </button>
      <div className="show-pg-container">
        <div className="show-pg-content">
          <FadeInSection delay={300}>
            <h1 className="show-pg-name">{location.name}</h1>
          </FadeInSection>
          <FadeInSection delay={1150}>
            <div className="show-pg-photos">
              <img src={location.image} alt={location.name} />
              <FadeInSection delay={750}>
                <div className="show-pg-description">
                  <p>{location.notes}</p>
                </div>
              </FadeInSection>
              {isLoggedIn && (
                <button className="show-pg-delete-btn" onClick={removeLocation}>
                  Delete
                </button>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </>
  );
}

const FadeInSection = ({ children, delay }) => (
  <FadeIn transitionDuration="1000" delay={delay}>
    {children}
  </FadeIn>
);

FadeInSection.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

FadeInSection.defaultProps = {
  delay: 0,
};

Show.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Show;
