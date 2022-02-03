import { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Index from '../pages/index';
import Show from '../pages/show';
import Footer from "../components/footer";
import FadeIn from 'react-fade-in';

function Home({img}, props) {

  // fetch backend data with locations
  const [locations, setLocations] = useState(null)

  const URL = 'http://localhost:4000/'

  const getLocationsRef = useRef()

  const getLocations = async () => {
    if(!props.user) return
    
    const token = await props.user.getIdToken()

    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const data = await response.json()
    setLocations(data)
  }

  // Create a location using fetch
  const createLocations = async (location) => {
    if(!props.user) return

    const token = await props.user.getIdToken()

    await fetch (URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(location)
    })

    getLocations()
  }

  const deleteLocations = async id => {
    if (!props.user) return

    await fetch(URL + id, {
      method: "DELETE",
    })
    getLocations()
  }

  useEffect(() => {
    getLocationsRef.current = getLocations
  })

  useEffect(() => {
    if(props.user) {
      getLocationsRef.current()
    } else {
      setLocations(null)
    }
  }, [props.user])

  return (
    <>
      <div style={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img}) top left / cover no-repeat`,
        color: 'rgba(241, 250, 238, 0.9)',
        letterSpacing: '2px',
        fontSize: '50px',
        fontFamily: `"Times New Roman", Times, serif`,
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
        <FadeIn transitionDuration="1250"><h1>WORLD TRAVELER</h1></FadeIn>
        <FadeIn transitionDuration="700"><p style={{fontSize: '25px'}} ><i>hand selected locations for you</i></p></FadeIn>
        </div>
    <>
        <Switch>
          <Route exact path="/locations">
            <Index user={props.user}
            locations={locations}
            createLocations={createLocations}
            />
          </Route>

          <Route
            path="/locations/:id"
            render={(rp) => (
              props.user ?
              <Show
              locations = {locations}
              deleteLocations={deleteLocations}
                {...rp}
              />
              :
              <Redirect to="/"/>
            )}
          /><br/>
        </Switch>
        <Footer />
        </>
      </>
  )
}

export default Home;
