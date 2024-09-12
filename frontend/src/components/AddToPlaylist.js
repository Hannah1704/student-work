import React from 'react';

export class AddToPlaylist extends React.Component {
  constructor(props) {
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

  handleAdd = (e) => {
    e.preventDefault();
    const { title, artist, album } = this.state;
    console.log(`Added "${title}" by ${artist} from the album "${album}" to playlist`);
    
    // You can also pass the song data to a parent component via a callback prop
    if (this.props.onAddSong) {
      this.props.onAddSong({ title, artist, album });
    }

    // Clear the form after submission
    this.setState({ title: '', artist: '', album: '' });
  };

  render() {
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
