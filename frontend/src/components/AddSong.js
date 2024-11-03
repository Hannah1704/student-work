import React from 'react';

export class AddSong extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      duration: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, artist, duration } = this.state;
    console.log({ title, artist, duration });

    this.setState({ title: '', artist: '', duration: '' });
  };

  render() 
  {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={this.state.artist}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={this.state.duration}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add Song</button>
      </form>
    );
  }
}
