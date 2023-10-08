import { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Index from "../pages/index";
import Show from "../pages/show";
import Footer from "../components/footer";
import FadeIn from "react-fade-in";

import desertImage from "../images/desert_Hd.jpg";

function Home(props) {
  // State and URL setup
  const [locations, setLocations] = useState(null);
  const URL = process.env.REACT_APP_URL;
  const LayeredBackground = () => (
    <div className="layered-background" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url(${location.imageUrl})` }}></div>
  );

  const fetchToken = useCallback(async () => {
    if (!props.user) throw new Error("User is not authenticated");
    return await props.user.getIdToken();
  }, [props.user]);

  const fetchLocations = useCallback(
    async (token) => {
      const response = await fetch(`${URL}/locations`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      return await response.json();
    },
    [URL]
  );

  useEffect(() => {
    const getLocations = async () => {
      try {
        if (!props.user) return;

        const token = await fetchToken();
        const data = await fetchLocations(token);
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    };

    getLocations();
  }, [props.user, URL, fetchToken, fetchLocations]);

  const createLocation = async (location) => {
    try {
      if (!props.user) return;

      const token = await fetchToken();
      const response = await fetch(`${URL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(location),
      });

      if (!response.ok) {
        throw new Error("Failed to create location");
      }

      const data = await fetchLocations(token);
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      if (!props.user) return;

      const response = await fetch(`${URL}/locations/${id}`, {
        method: "DELETE",
      });

      if (response.status === 403) {
        alert("You do not have permission to delete this location.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete location");
      }

      const token = await fetchToken();
      const data = await fetchLocations(token);
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const maxBlur = 20; // Maximum blur at the top
      const minBlur = 4;  // Minimum blur at the bottom
      let blurValue = maxBlur - (scrollPosition / 100);
      blurValue = Math.min(maxBlur, Math.max(minBlur, blurValue));
      const backgroundLayer = document.querySelector('.layered-background');
      backgroundLayer.style.filter = `blur(${blurValue}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
}, []);

//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     fetch(`${URL}/api/unsplash/random`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch from backend");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         let imageUrl, locationName;
    
//         if (Array.isArray(data) && data[0]) {
//             imageUrl = data[0].urls?.full;
//             locationName = data[0].location?.name || "Mysterious Destination";
//         } else {
//             imageUrl = data.urls?.full;
//             locationName = data.location?.name || "Mysterious Destination";
//         }
    
//         if (imageUrl) {
//             setLocation({
//                 imageUrl,
//                 name: locationName
//             });
//         } else {
//             console.error("Unexpected data structure:", data);
//         }
//     })
    
//       .catch((error) => {
//         console.error("Failed to fetch recommendation:", error);
//       });
// }, [URL]);


//   if (!location) return <div>Loading recommendation...</div>;
  const [location] = useState({
    imageUrl: desertImage,
    name: "Mysterious Destination",
  });




  // Render component
  return (
    <>
      <LayeredBackground />
      <Switch>
        <Route exact path="/">
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
          </div>

          <div className="rec-section">
            <h2 className="rec-title">Our Destination Recommendation</h2>
            <div className="rec-content">
              <img
                src={location.imageUrl}
                alt={location.name}
                className="rec-image"
              />
              <p className="rec-destination-name">{location.name}</p>
            </div>
          </div>
        </Route>
        <Route exact path="/locations">
          <Index
            user={props.user}
            locations={locations}
            createLocation={createLocation}
          />{" "}
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
        />{" "}
      </Switch>{" "}
      <Footer />
    </>
  );
}

export default Home;
