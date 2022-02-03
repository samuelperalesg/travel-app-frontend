import FadeIn from 'react-fade-in';

function Show(props){

  const id = props.match.params.id
  const locations = props?.locations
  const location = locations ? locations.find(l => l._id === id) : null

const removeLocation = () => {
  props.deleteLocations(location._id)
  props.history.push('/locations')
}

const loaded = () => (
  <>
    <div style={{
      minHeight: '90%',
      backgroundColor: '#F8F0E3',
      margin: '0',
    }}>

      <FadeIn transitionDuration="1000" delay="300">
        <h1 id="name" style={{
          padding: '50px',
          fontSize: '100px',
          letterSpacing: '1.5px',
          }}>
          {location.name}
        </h1>
      </FadeIn>

      <FadeIn transitionDuration="1000" delay="750">
        <div id="description" style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p style={{width: '50%', letterSpacing: '2px', paddingBottom: '50px'}}>{location.notes}</p>
        </div>
      </FadeIn>

      <FadeIn transitionDuration="1000" delay="1150">
        <div id="photos" style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          }}>
            <img style={{maxWidth: '50%', minWidth:'500px', height: '500px'}} src={location.image} alt={location.name} />
        </div>
        <button id="delete" onClick={removeLocation}>Delete</button>
      </FadeIn>
    </div>
  </>
)

const loading = () => <h1>Loading...</h1>


  return (
    <div className="location">
      {location ? loaded() : loading() }
    </div>
  )
}


export default Show;
