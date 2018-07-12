import React, { Component } from 'react';

class IsMusicPlaying extends Component {

  render () {
    const iconPause = <ion-icon name="pause"></ion-icon>;
    const iconPlay = <ion-icon name="play"></ion-icon>;

      return (
      <div >
        {this.props.isPlaying? iconPause : iconPlay}
      </div>
    );
  }
}

export default IsMusicPlaying;