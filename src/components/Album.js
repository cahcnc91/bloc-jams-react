import React, { Component } from 'react';
import albumData from './../data/albums';
import IsMusicPlaying from './subcomponent/IsMusicPlaying';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find ( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: false,
      currentIndexHovered: -1
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    this.handleSongClick = this.handleSongClick.bind(this);
    this.hoverOnIt = this.hoverOnIt.bind(this);
    this.hoverOffIt = this.hoverOffIt.bind(this);

  }

    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }   

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if (!isSameSong) { this.setSong(song); } 
        this.play();
      }
    }

    hoverOnIt(index) {
      const isSameNumber = this.state.album.songs[index];
      if (isSameNumber) { 
        this.setState({ 
          isHovered: true,
          currentIndexHovered: index 
        });
      }
    }

    hoverOffIt() {
      this.setState({ 
        isHovered: false,
        currentIndexHovered: -1
        });
    }

   render() {

     return (
       <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title"></h1>
            <h2 className="artist"></h2>
            <div id="release-info">
            <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>  
          <tbody>
            {this.state.album.songs.map( (song, index) =>
              <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                <td key={index} onMouseEnter={() => this.hoverOnIt(index)} onMouseLeave={this.hoverOffIt}>
                    {this.state.isHovered && this.state.currentIndexHovered === index ? <IsMusicPlaying /> : <button>{index+1}</button> }
                </td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
              </tr>
              )
            }
           </tbody>
         </table> 
       </section>
     );
   }
 }

export default Album;