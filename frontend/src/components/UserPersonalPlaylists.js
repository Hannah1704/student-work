import React, { Component } from 'react';

export class CreatePlaylist extends Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      name: '',
      songs: [],
      songTitle: '',
      songArtist: '',
      message: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddSong = () => {
    const { songTitle, songArtist } = this.state;
    if (songTitle && songArtist) {
      this.setState((prevState) => ({
        songs: [...prevState.songs, { title: songTitle, artist: songArtist }],
        songTitle: '',
        songArtist: '',
      }));
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, songs } = this.state;

    try 
    {
      const response = await fetch('http://localhost:3000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, songs }),
      });

      if(!response.ok) 
      {
        throw new Error('Failed to create playlist');
      }

      const result = await response.json();
      this.setState({ message: `Playlist created with ID: ${result}`, name: '', songs: [] });
      
      this.props.fetchPlaylists(); 
    } 
    catch(error) 
    {
      console.error('Error creating playlist:', error);
      this.setState({ message: 'Error creating playlist' });
    }
  };

  render() 
  {
    const { name, songTitle, songArtist, songs, message } = this.state;

    return (
      <div>
        <h2>Create New Playlist</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Playlist Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Song Title:
              <input
                type="text"
                name="songTitle"
                value={songTitle}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Artist:
              <input
                type="text"
                name="songArtist"
                value={songArtist}
                onChange={this.handleChange}
              />
            </label>
            <button type="button" onClick={this.handleAddSong}>
              Add Song
            </button>
          </div>
          <div>
            <h3>Added Songs:</h3>
            <ul>
              {songs.map((song, index) => (
                <li key={index}>
                  {song.title} by {song.artist}
                </li>
              ))}
            </ul>
          </div>
          <button type="submit">Create Playlist</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
}
