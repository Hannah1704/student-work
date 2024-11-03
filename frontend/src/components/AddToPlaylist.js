import React from 'react';

export class AddToPlaylist extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      title: '',
      artist: '',
      album: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAdd = async (e) => {
    e.preventDefault();
    const { title, artist, album } = this.state;
    const newSong = {
      title,
      artist,
      album,
      addedAt: new Date().toISOString(), 
      user: "user123" 
    };
  
    try 
    {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });
  
      if(response.ok) 
      {
        console.log(`Added "${title}" by ${artist} to playlist`);
      } 
      else 
      {
        console.error('Failed to add song to playlist');
      }
    } 
    catch(error) 
    {
      console.error('Error adding song:', error);
    }

    this.setState({ title: '', artist: '', album: '' });
  };
  

  render() 
  {
    return (
      <div>
        <h3>Add a Song to Playlist</h3>
        <form onSubmit={this.handleAdd}>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Artist:
              <input
                type="text"
                name="artist"
                value={this.state.artist}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Album:
              <input
                type="text"
                name="album"
                value={this.state.album}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button type="submit">Add to Playlist</button>
        </form>
      </div>
    );
  }
}
