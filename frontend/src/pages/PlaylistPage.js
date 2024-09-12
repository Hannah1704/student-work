import React from 'react';
import { Song } from '../components/Song';
import { AddSong } from '../components/AddSong'; // AddSong Component

export class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: { name: 'My Favorite Songs', description: 'Best hits!' },
      songs: [
        { title: 'Song 1', artist: 'Artist 1', duration: '3:30' },
        { title: 'Song 2', artist: 'Artist 2', duration: '4:15' },
      ],
    };
  }

  handleAddSong = (song) => {
    this.setState((prevState) => ({
      songs: [...prevState.songs, song]
    }));
  };

  render() {
    const { playlist, songs } = this.state;

    return (
      <div className="playlist-page">
        <h1>{playlist.name}</h1>
        <p>{playlist.description}</p>
        <h2>Songs in this Playlist</h2>
        {songs.map((song, index) => (
          <Song key={index} {...song} />
        ))}
        <AddSong onAddSong={this.handleAddSong} /> {/* AddSong Component */}
      </div>
    );
  }
}
