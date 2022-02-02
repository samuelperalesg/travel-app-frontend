import React from 'react';
import FadeIn from 'react-fade-in';

function Show({name, description, photos}) {
  return (
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
          Anchorage, AK
        </h1>
      </FadeIn>

      <FadeIn transitionDuration="1000" delay="750">
        <div id="description" style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p style={{width: '50%', letterSpacing: '2px', paddingBottom: '50px'}}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur magna nec quam iaculis, id vestibulum nibh sagittis. Etiam pharetra nulla sem, eu posuere sapien tincidunt ac. Nam id placerat massa. Cras et massa ullamcorper, efficitur orci quis, posuere mauris. Nam vel cursus arcu, nec ultricies nunc. Mauris et lorem a eros lacinia placerat eu sed augue. Cras quis diam vehicula orci tristique dictum in sit amet leo. Suspendisse nisl orci, sollicitudin sed velit ut, euismod mattis nisl. Quisque ut enim cursus, aliquam tellus vitae, iaculis leo. Sed maximus aliquet convallis. Suspendisse quis velit nec urna viverra tempus. Sed ultrices tellus scelerisque dui laoreet pretium. Sed sit amet felis mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam eu est et nisl efficitur lacinia vel vitae lorem. Vestibulum lacus odio, bibendum id feugiat sagittis, rutrum eu arcu.
          </p>
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
            <img style={{maxWidth: '50%', minWidth:'500px', height: '500px'}} src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Anchorage_on_an_April_evening.jpg" alt="" />
            <img style={{maxWidth: '50%', minWidth:'500px', height: '500px'}} src="https://i.imgur.com/kjrqr_d.webp?maxwidth=1520&fidelity=grand" alt="" />
            <img style={{maxWidth: '50%', minWidth:'500px', height: '500px'}} src="https://i.imgur.com/UTJVrtd_d.webp?maxwidth=760&fidelity=grand" alt="" />
        </div>
      </FadeIn>
    </div>
  )
}

export default Show;
