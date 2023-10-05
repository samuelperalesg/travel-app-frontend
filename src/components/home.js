import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Index from "../pages/index";
import Show from "../pages/show";
import Footer from "../components/footer";
import FadeIn from "react-fade-in";

function Home(props) {
  // State and URL setup
  const [locations, setLocations] = useState(null);
  const URL = process.env.REACT_APP_URL;

  // useEffect hook to fetch data upon user state change
  useEffect(() => {
    const getLocations = async () => {
      if (!props.user) return;

      const token = await props.user.getIdToken();
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      setLocations(data);
    };

    if (props.user) {
      getLocations();
    } else {
      setLocations(null);
    }
  }, [props.user, URL]);

  // Create a location using fetch
  const createLocation = async (location) => {
    if (!props.user) return;

    const token = await props.user.getIdToken();
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(location),
    });

    // After creation, refresh the list
    // This can be improved by either not calling this function or using context, etc.
    if (props.user) {
      const token = await props.user.getIdToken();
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setLocations(data);
    }
  };

  // Delete a location
  const deleteLocation = async (id) => {
    if (!props.user) return;

    const response = await fetch(URL + id, {
      method: "DELETE",
    });

    if (response.status === 403) {
      alert("You do not have permission to delete this location.");
      return;
    }

    // After deletion, refresh the list
    if (props.user) {
      const token = await props.user.getIdToken();
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setLocations(data);
    }
  };

  // Render component
  return (
    <>
      <Switch>
        <Route exact path="/">
          <div
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.img}) top left / cover no-repeat`,
              color: "rgba(241, 250, 238, 0.9)",
              letterSpacing: "2px",
              fontSize: "50px",
              fontFamily: `"Times New Roman", Times, serif`,
              height: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <FadeIn transitionDuration="1250">
              <h1>WORLD TRAVELER</h1>
            </FadeIn>
            <FadeIn transitionDuration="700">
              <p style={{ fontSize: "25px" }}>
                <i>hand selected locations for you</i>
              </p>
            </FadeIn>
          </div>
        </Route>

        <Route exact path="/locations">
          <Index
            user={props.user}
            locations={locations}
            createLocation={createLocation}
          />
        </Route>

        <Route
          path="/locations/:id"
          render={(rp) =>
            props.user ? (
              <Show
                locations={locations}
                deleteLocation={deleteLocation}
                {...rp}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
      <Footer />
    </>
  );
}

export default Home;
