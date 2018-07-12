import React, { Component } from 'react';

class IsMusicPlaying extends Component {

  render () {
    const isPlaying = this.props.isPlaying;
    let icon;
    if(isPlaying) {
    icon = <h1>playing</h1>;
    } else {
    icon = <h2>paused</h2>;
    }
    

    return (
      <div>
        {icon}
      </div>
    );
  }
}

export default IsMusicPlaying;