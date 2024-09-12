import React from 'react';

export class Song extends React.Component {
  render() {
    const { title, artist, duration } = this.props;
    return (
      <div className="song">
        <h3>{title}</h3>
        <p>{artist}</p>
        <p>{duration}</p>
      </div>
    );
  }
}
