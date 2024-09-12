import React from 'react';
import { Feed } from '../components/Feed';
import { SearchInput } from '../components/SearchInput';
import { AddToPlaylist } from '../components/AddToPlaylist';
import { AddSong } from '../components/AddSong'; // AddSong Component

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        { title: 'Song 1', artist: 'Artist 1', duration: '3:30' },
        { title: 'Song 2', artist: 'Artist 2', duration: '4:15' },
      ],
      playlists: [
        { name: 'Playlist 1', songCount: 5 },
        { name: 'Playlist 2', songCount: 12 },
      ]
    };
  }

  handleAddSong = (song) => {
    this.setState((prevState) => ({
      songs: [...prevState.songs, song]
    }));
  };

  render() {
    const { songs, playlists } = this.state;

    return (
      <div className="home-page">
        <h1>Home</h1>
        <SearchInput />
        <AddSong onAddSong={this.handleAddSong} /> {/* AddSong Component */}
        <AddToPlaylist />
        <Feed songs={songs} playlists={playlists} />
      </div>
    );
  }
}
