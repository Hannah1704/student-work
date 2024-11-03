import React, { Component } from 'react';

export class CreateSong extends Component 
{
  state = {
    title: '',
    artist: '',
    duration: '',
    link: '',
    successMessage: '',
    errorMessage: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isSpotifyEmbedLink = (link) => {
    return link.includes('https://open.spotify.com/embed/');
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, artist, duration, link } = this.state;

    if(!this.isSpotifyEmbedLink(link))
    {
      this.setState({ errorMessage: 'Please enter a valid Spotify embed link.' });
      return;
    }

    const date = new Date().toISOString(); 

    try 
    {
      const response = await fetch('http://localhost:3000/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, artist, duration, link, date }),
      });

      if(response.ok) 
      {
        const insertedId = await response.json();
        this.setState({ successMessage: `Song created successfully! ID: ${insertedId}`, errorMessage: '' });
        this.setState({ title: '', artist: '', duration: '', link: '' }); 
      } 
      else 
      {
        this.setState({ errorMessage: 'Error creating song', successMessage: '' });
      }
    } 
    catch(error)
    {
      console.error('Error during song creation:', error);
      this.setState({ errorMessage: 'Internal Server Error', successMessage: '' });
    }
  };

  render() 
  {
    const { title, artist, duration, link, successMessage, errorMessage } = this.state;

    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Create a New Song</h2>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Song Title"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="artist"
            value={artist}
            onChange={this.handleChange}
            placeholder="Artist"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={this.handleChange}
            placeholder="Duration (e.g., 3:45)"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="link"
            value={link}
            onChange={this.handleChange}
            placeholder="Spotify Embed Link"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Create Song</button>
        </form>
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
    );
  }
}


// Styles
const styles = {
  container: 
  {
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '2rem auto',
  },
  header: 
  {
    color: '#cf1271',
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  form: 
  {
    display: 'flex',
    flexDirection: 'column',
  },
  input: 
  {
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #cf1271',
    transition: 'border 0.3s',
  },
  button: 
  {
    backgroundColor: '#cf1271',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  success: 
  {
    color: 'green',
    textAlign: 'center',
  },
  error: 
  {
    color: 'red',
    textAlign: 'center',
  },
};
