import React from "react";
import PropTypes from "prop-types"; // Add this import for prop type checking
import FadeIn from "react-fade-in";

function Show({ match, locations, deleteLocation, history }) {
  // Destructuring directly

  const id = match.params.id;
  const location = locations.find((l) => l._id === id);

  const removeLocation = () => {
    deleteLocation(location._id);
    history.push("/locations");
  };

  if (!location) {
    return <h1>Location not found</h1>;
  }

  return (
    <div className="show-pg-container">
      <div className="show-pg-content">
        <FadeIn transitionDuration="1000" delay="300">
          <h1 className="show-pg-name">{location.name}</h1>
        </FadeIn>

        <FadeIn transitionDuration="1000" delay="1150">
          <div className="show-pg-photos">
            <img src={location.image} alt={location.name} />
            <FadeIn transitionDuration="1000" delay="750">
              <div className="show-pg-description">
                <p>{location.notes}</p>
              </div>
            </FadeIn>
            <button className="show-pg-delete-btn" onClick={removeLocation}>
              Delete
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// PropTypes for better type checking and documentation
Show.propTypes = {
  match: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  deleteLocation: PropTypes.func.isRequired, // Note: deleteLocation not deleteLocations
  history: PropTypes.object.isRequired,
};

export default Show;
