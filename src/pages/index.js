import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

{
  /* 
  How the transition timers work: 

    The title "LOCATIONS" starts at 350MS.

    Every new catagory, AKA "TRENDING" and "CATALOG" add on +350MS to whatever the current MS is at.

    Every new item inside these catagories add +100MS to whatever the current MS is at.

    Illustration:

      1. Title | 350 MS 
      2. Trending | 700 MS (+350)
      3. Trending has 5 boxes so each box is +100 MS from each other
        3a. 700 + 350 (because new box) + 100MS + 100MS + 100MS + 100MS
        3b. so now the total MS is at 1450 MS.
      4. Catalog | 1850 MS (+350)
      5. Catalog has 5 boxes so each box is +100MS from each other
        5a. 1850 + 350 (because new box) + 100MS + 100MS + 100MS + 100MS
        5b. so now the total MS is at 2500 MS. 
*/
}

function Index(props) {
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    notes: "",
  });

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (!props.user) return;

    event.preventDefault();

    props.createLocations(newForm);

    setNewForm({
      name: "",
      image: "",
      notes: "",
    });
  };

  const loaded = () => {
    return props.locations.map((location) => (
      <>
        <div
          id="indexPopular"
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            paddingLeft: "20px",
          }}
        >
          <FadeIn transitionDuration="1000" delay="700">
            <h1 style={{ letterSpacing: "2px", color: "#333333" }}>
              <i>TRENDING</i>
            </h1>
          </FadeIn>
        </div>

        <div
          id="indexPopularContainer"
          style={{
            overflow: "auto",
            maxWidth: "100%",
            minHeight: "50px",
            padding: "10px",
            display: "flex",
            paddingLeft: "10px",
          }}
        >
          <FadeIn transitionDuration="1000" delay="1050">
            <div id="popularItem">
              <Link to={`/locations/${location._id}`}>
                <img
                  src={location.image}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "170px",
                    borderRadius: "13%",
                    paddingRight: "5px",
                  }}
                  alt={location.name}
                />
              </Link>

              <h5 style={{ letterSpacing: "1.5px" }}>{location.name}</h5>
            </div>
          </FadeIn>
        </div>

        <div
          id="indexCatalog"
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            paddingLeft: "20px",
          }}
        >
          <FadeIn transitionDuration="1000" delay="1850">
            <h1 style={{ letterSpacing: "2px", color: "#333333" }}>
              <i>CATALOG</i>
            </h1>
          </FadeIn>
        </div>

        <div
          id="indexCatalogContainer"
          style={{
            overflow: "auto",
            maxWidth: "100%",
            minHeight: "50px",
            padding: "10px",
            display: "flex",
            paddingLeft: "10px",
          }}
        >
          <FadeIn transitionDuration="1000" delay="2100">
            <div id="CatalogItem" onClick="--- ADD ON CLICK ROUTE HERE ---">
              <img
                src="https://drscdn.500px.org/photo/178159719/m%3D900/52e52da54ffba9e38b929962dc1c7559"
                style={{
                  maxWidth: "300px",
                  maxHeight: "170px",
                  borderRadius: "13%",
                  paddingRight: "5px",
                }}
                alt=""
              />
              <h5 style={{ letterSpacing: "1.5px" }}>Catalog Item, Location</h5>
            </div>
          </FadeIn>
        </div>
      </>
    ));
  };

  const loading = () => {
    return <h1 style={{margin: "2rem"}}>Loading...</h1>;
  };

  return (
    <>
      <div
        style={{
          minHeight: "90%",
          backgroundColor: "#F8F0E3",
        }}
      >
        <FadeIn transitionDuration="1000" delay="350">
          <div id="indexHeader">
            <h1
              style={{
                letterSpacing: "2px",
                color: "#333333",
                padding: "50px",
                fontSize: "60px",
              }}
            >
              LOCATIONS
            </h1>
          </div>

          <div>
            {
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  type="text"
                  value={newForm.name}
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  value={newForm.image}
                  name="image"
                  placeholder="image URL"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  value={newForm.notes}
                  name="notes"
                  placeholder="notes"
                  onChange={handleChange}
                />
                <input type="submit" value="Create Location" />
              </form>
            }
          </div>
            
            {props.locations ? loaded() : loading()}
        </FadeIn>
      </div>
    </>
  );
}

export default Index;
