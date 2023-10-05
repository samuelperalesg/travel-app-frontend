import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";


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

    props.createLocation(newForm);

    setNewForm({
      name: "",
      image: "",
      notes: "",
    });
  };

  const loaded = () => {
    return props.locations.map((location) => (
      <div key={location._id} className="location">
        <div
          id="indexPopular"
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            paddingLeft: "20px",
          }}
        >
          {/* <FadeIn transitionDuration="1000" delay="700">
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
        > */}
          
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
            <div id="CatalogItem">
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
      </div>
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

          <FadeIn transitionDuration="1000" delay="1850">
            <h1 style={{ letterSpacing: "2px", color: "#333333", margin: "20px" }}>
              <i>CATALOG</i>
            </h1>
          </FadeIn>
            {props.locations ? loaded() : loading()}
        </FadeIn>

        <FadeIn transitionDuration="1000" delay="2000">
          <h3>Can't find a location?</h3>
        </FadeIn>
        <FadeIn transitionDuration="1000" delay="3000">
          <div style={{display:'flex', justifyContent:'center',}}>
              {
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: 'column',
                    width: '30%',
                  }}
                >
                  <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    style={{textAlign:'center'}}
                  />
                  <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                    style={{textAlign:'center'}}
                  />
                  <input
                    type="text"
                    value={newForm.notes}
                    name="notes"
                    placeholder="notes"
                    onChange={handleChange}
                    style={{textAlign:'center'}}
                  />
                  <input 
                    type="submit" 
                    value="Create Location"
                    style={{
                      display: 'inline-block',
                      outline: '0',
                      cursor: 'pointer',
                      border: '0',
                      padding: '7px 16px',
                      minHeight: '36px',
                      minWidth: '36px',
                      color: '#ffffff',
                      background: '#008060',
                      borderRadius: '4px',
                      fontWeight: '500',
                      fontSize: '14px',
                      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset',
                    }}
                  />
                </form>
              }
            </div>
          </FadeIn>
      </div>
    </>
  );
}

export default Index;
