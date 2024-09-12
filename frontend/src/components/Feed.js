import React from 'react';
import { Song } from './Song';
import { PlaylistPreview } from './PlaylistPreview';

export class Feed extends React.Component {
  render() {
    const { songs, playlists } = this.props;
    return (
      <div className="feed">
        <h2>Song Feed</h2>
        {songs.map((song, index) => (
          <Song
            key={index}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
          />
        ))}
        
        <h2>Playlist Feed</h2>
        {playlists.map((playlist, index) => (
          <PlaylistPreview
            key={index}
            name={playlist.name}
            songCount={playlist.songCount}
          />
        ))}
      </div>
    );
  }
}
