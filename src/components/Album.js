import React, { Component } from 'react';
import albumData from './../data/albums';
import IsMusicPlaying from './subcomponent/IsMusicPlaying';
import PlayerBar from './PlayerBar';
import './Album.css';

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
      isHoveredAlbum: false,
      currentIndexHovered: -1,
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 1,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    this.handleSongClick = this.handleSongClick.bind(this);
    this.hoverOnIt = this.hoverOnIt.bind(this);
    this.hoverOffIt = this.hoverOffIt.bind(this);
  }


    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        },
        volumechange: e => {
          this.setState({ volume: this.audioElement.volume});
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }
 
    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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

    formatTime(n) {
      const time = n;
      let minutes = parseInt(time/ 60);
      let seconds = parseInt( time% 60);
      if (seconds < 10) {
        return minutes + ':0' + seconds;
      }
      return minutes + ':' + seconds;
    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume})
    }

    render() {

     return (
      <section className="album-page-container">
        <div className="header-album">
          <h3 id="album-title">{this.state.album.title}</h3>
          <h5 id="artist-name">{this.state.album.artist}</h5>
          <h5 id="release-info">{this.state.album.releaseInfo}</h5>
        </div>
        <section id="container">
          <div id="album-box">
            <img className="image-album" src={this.state.album.albumCover} alt={this.state.album.title} />  
            <div className="overlay" >
              <div className="album-info-text">
                <h5>NOW PLAYING</h5>
                <h2 id="album-title">{this.state.album.title}</h2>
                <h3 id="artist-name">{this.state.album.artist}</h3>
              </div>
            </div>
          </div>
          <div className="song-list">
              <table>
                <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                </colgroup>  
                <tbody>
                  {this.state.album.songs.map( (song, index) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                      <td className="number-td" key={index} onMouseEnter={() => this.hoverOnIt(index)} onMouseLeave={this.hoverOffIt}>
                        {this.state.isHovered && this.state.currentIndexHovered === index? <IsMusicPlaying isPlaying={this.state.isPlaying}/> : <div>{index+1}</div> }
                      </td>
                      <td className="title-td">{song.title}</td>
                      <td className="duration-td" >{this.formatTime(song.duration)}</td>
                  </tr>
                  )
                  }
                </tbody>
              </table>
          </div>
          <div className="playerbar">
            <PlayerBar 
            isPlaying={this.state.isPlaying} 
            currentSong={this.state.currentSong} 
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            formatTime={(n) => this.formatTime(n) }
            volume={this.state.volume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={ (e) => this.handleVolumeChange(e)}
            />
          </div>
        </section>
      </section>
     );
   }
 }

export default Album;