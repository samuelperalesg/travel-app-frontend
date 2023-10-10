import React, { useState, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


function Index(props) {
    const locationState = useLocation().state;
  
  
    const initialFormState = locationState?.newForm || {
      name: "",
      image: "",
      notes: "",
    };
  
  const [localLocations, setLocalLocations] = useState([]);
  const [newForm, setNewForm] = useState(initialFormState);
  
  const formRef = useRef(null);
  const history = useHistory();
  
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formRef.current) {
      formRef.current.reset();
    }    

    if (props.user) {
      await createLocation(newForm);
      history.push('/locations');
      window.location.reload();
    } else {
      setLocalLocations([...localLocations, newForm]);
    }

    setNewForm({
      name: "",
      image: "",
      notes: "",
    });
  };

  const renderLocations = () => {
    let allLocations = [...(props.locations || []), ...localLocations];

    allLocations.sort((a, b) => (a._id > b._id ? -1 : 1));

    return allLocations.map((location, index) => (
      <div key={location._id || `local-${index}`} className="idx-pg-location">
        <Link to={`/locations/${location._id || "local"}`}>
          <img
            className="idx-pg-location-image"
            src={location.image}
            alt={location.name}
          />
        </Link>
        <h5 className="idx-pg-location-name">{location.name}</h5>
      </div>
    ));
  };

  async function createLocation(locationData) {
    try {
      const token = await props.user.getIdToken(); // Fetching token here

      const response = await fetch(`${process.env.REACT_APP_URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div className="idx-pg-container">
      <h1 className="idx-pg-header">LOCATIONS</h1>
      {!props.user && (
        <p className="idx-pg-msg">Login to save your locations.</p>
      )}
      {props.user && (
        <p className="idx-pg-msg">Add locations you would like to visit.</p>
      )}

      <div className="idx-pg-form-container">
        <form onSubmit={handleSubmit} ref={formRef}>
          <input
            type="text"
            value={newForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
            className="idx-pg-inputs"
          />
          <input
            type="text"
            value={newForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
            className="idx-pg-inputs"
          />
          <input
            type="text"
            value={newForm.notes}
            name="notes"
            placeholder="notes"
            onChange={handleChange}
            className="idx-pg-inputs idx-pg-notes"
          />
          <input
            type="submit"
            value="Create Location"
            className="idx-pg-inputs"
          />
        </form>
      </div>

      <div className="idx-pg-grid">{renderLocations()}</div>
    </div>
  );
}

export default Index;
