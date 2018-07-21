import React, { Component } from 'react';
import './PlayerBar.css';
 
class PlayerBar extends Component {
  render() {
    return (
      <section>

        <div className='current-time-bar'>
          <input 
            type="range" 
            className="slider" 
            id="slider1"
            value={(this.props.currentTime / this.props.duration) || 0} 
            max="1" 
            min="0" 
            step="0.001" 
            onChange={this.props.handleTimeChange}
          /> 
        </div>

        <section className="playerbar-vbl">
          <div className="volume-control">
            <input 
              type="range" 
              orient="vertical"
              className="slider" id="slider1"
              value={this.props.volume} 
              min="0"
              max="1" 
              step="0.01"
              onChange={this.props.handleVolumeChange}
            />
            <ion-icon name="volume-high"></ion-icon>
          </div>

          <div className="buttons">
              <button id="previous" onClick={this.props.handlePrevClick}>
                <ion-icon name="skip-backward"></ion-icon>
              </button>
              <button id="play-pause" onClick={this.props.handleSongClick}>
                  {this.props.isPlaying ? <ion-icon name="pause"></ion-icon> :<ion-icon name="play"></ion-icon> }
              </button>
              <button id="next" onClick={this.props.handleNextClick}>
                <ion-icon name="skip-forward"></ion-icon>
              </button>
          </div>

          <div className="time-control">                                                                    
            <div className="current-time">{this.props.formatTime(this.props.currentTime)}  /  {this.props.formatTime(this.props.duration)}</div> 
          </div>

          
          
          
        </section>

      </section>
    );
  }
}

export default PlayerBar;