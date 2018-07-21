import React from 'react';
import './Landing.css';
import Library from'./Library';
import { Route, Link } from 'react-router-dom';

const Landing = () => (
  <section className="landing">
    <div className="title-box">
      <h1>Bloc</h1>
    </div>
    <div class="title-box-right">
      <h1>Jams</h1>
    </div>
    <div className="selling-point-one">
      <h2 className="hero-title">Turn the music up!</h2>
    </div>
    
    <section className="selling-points-two">
      <div className="point">
        <h2 className="point-title">Choose your music</h2>
        <p className="point-description">The world is full of music, why should <br />you have to listen to music that someone else chose?</p>
        <ion-icon name="person"></ion-icon>
      </div>
      <div className="point">
        <h2 className="point-title">Unlimited, streaming,<br /> ad-free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
        <ion-icon name="play-circle"></ion-icon>
      </div>
      <div className="point">
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">Listen to your music on the go.<br />This streaming service is available on all mobile platforms.</p>
        <ion-icon name="phone-portrait"></ion-icon>
      </div>
    </section>
  </section>
);

export default Landing;