import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

class Library extends Component { 
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

   render() {
    return ( 
      <section className='library'>
        <h2>Available now</h2>
        <p>Discover new music, all the time</p>
        <div className="album-box-div">
        {
          this.state.albums.map( (album, index) =>
            <Link className="album-div-library" to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
              <p>{album.songs.length} songs</p>
            </Link>
           )
         }
        </div>
       </section>
     );
   }
 }

export default Library;