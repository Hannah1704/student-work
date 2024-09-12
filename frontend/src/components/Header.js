import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Splash</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/playlist">Playlist</Link></li>
        </ul>
      </nav>
    );
  }
}
