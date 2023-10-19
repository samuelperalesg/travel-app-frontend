import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocationContext } from "../context/LocationContext";
import { useUser } from "../context/UserContext";

function Form(props) {
  const receivedData = props.location?.state?.locationData;
  const isForNewForm = receivedData?.formType === "new";
  const initialFormState = isForNewForm
    ? { ...receivedData.data, notes: receivedData.data.notes || "" }
    : {
        image: "",
        name: "",
        notes: "",
      };

  const [newForm, setNewForm] = useState(initialFormState);

  const {
    state: { defaultLocation },
    actions: locationActions,
  } = useLocationContext();

  const user = useUser();
  const [error] = useState(null);
  const history = useHistory();

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newForm);

    const locationDataToSend = {
      ...newForm,
      image: newForm.imageUrl,
    };
    delete locationDataToSend.imageUrl;

    const savedLocation = await locationActions.addLocation(locationDataToSend);

    if (!user) {
      history.push("/locations");
      locationActions.reloadLocations();
      return;
    }

    if (savedLocation && savedLocation._id) {
      history.push(`/locations/${savedLocation._id}`);
      locationActions.reloadLocations();
    } else {
      history.push("/locations");
    }
  };

  const LayeredBackground = () => (
    <div
      className="layered-background"
      style={{
        backgroundImage: defaultLocation
          ? `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url(${defaultLocation.imageUrl})`
          : "none",
      }}
    ></div>
  );

  return (
    <>
      <LayeredBackground />
      <div className="form-container">
        <h1 className="form-pg-header">LOCATIONS</h1>
        {!user && <p className="form-pg-msg">Login to save your locations.</p>}
        {user && (
          <p className="form-pg-msg">Add locations you would like to visit.</p>
        )}
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
            className="form-inputs"
            required
          />
          <input
            type="text"
            value={newForm.imageUrl}
            name="imageUrl"
            placeholder="image URL"
            onChange={handleChange}
            className="form-inputs"
            required
          />
          <input
            type="text"
            value={newForm.notes}
            name="notes"
            placeholder="notes"
            onChange={handleChange}
            className="form-inputs form-notes"
          />
          <input
            type="submit"
            value="Create Location"
            className="form-inputs"
          />
        </form>
      </div>
    </>
  );
}

export default Form;
