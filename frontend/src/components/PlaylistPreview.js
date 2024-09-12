import React from 'react';

export class PlaylistPreview extends React.Component {
  render() {
    const { name, songCount } = this.props;
    return (
      <div className="playlist-preview">
        <h4>{name}</h4>
        <p>{songCount} songs</p>
      </div>
    );
  }
}
