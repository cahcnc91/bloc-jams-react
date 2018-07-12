import React, { Component } from 'react';

class IsMusicPlaying extends Component {

  render () {
    const isPlaying = false;
    let icon;
    if(isPlaying) {
    icon = <ion-icon name="pause"></ion-icon>;
    } else {
    icon = <ion-icon name="play"></ion-icon>;
    }
    

    return (
      <div onClick={() => this.props.handleSongClick()}>
        {icon}
      </div>
    );
  }
}

export default IsMusicPlaying;