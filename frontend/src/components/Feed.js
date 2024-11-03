import React from 'react';
import { AiFillHeart, AiOutlineDelete } from 'react-icons/ai';

export class Feed extends React.Component {
  state = {
    likedSongs: [],
    savedPlaylists: [],
    message: '',
    playlists: [],
  };

  async componentDidMount() {
    await this.fetchPlaylists();
  }

  fetchPlaylists = async () => {
    try {
      const response = await fetch('/api/playlists');
      if (response.ok) {
        const playlistsData = await response.json();
        const playlistsWithSongs = await Promise.all(
          playlistsData.map(async (playlist) => {
            const songsWithDetails = await Promise.all(
              playlist.songs.map(async (songId) => {
                const songResponse = await fetch(`/api/songs/${songId}`);
                if (songResponse.ok) {
                  return songResponse.json();
                }
                return null;
              })
            );
            return { ...playlist, songs: songsWithDetails.filter(Boolean) };
          })
        );
        this.setState({ playlists: playlistsWithSongs });
      } else {
        console.log('Error fetching playlists');
      }
    } catch (error) {
      console.error('Error during fetching playlists:', error);
    }
  };

  handleLike = async (id, type) => {
    try {
      const endpoint = type === 'song' ? '/api/likes/song' : '/api/likes/playlist';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the item');
      }

      const data = await response.json();
      console.log(`Liked ${type} ID:`, data.id);

      if (type === 'song') {
        this.setState((prevState) => ({
          likedSongs: [...prevState.likedSongs, data.id],
          message: 'Song added to liked songs!',
        }));
      } else {
        this.setState((prevState) => ({
          savedPlaylists: [...prevState.savedPlaylists, data.id],
          message: 'Playlist saved!',
        }));
      }

      setTimeout(() => {
        this.setState({ message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error in handleLike:', error);
      this.setState({ message: `Failed to like the ${type}` });
    }
  };

  handleDelete = async (songId) => {
    try {
      const response = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the song');
      }

      this.setState({
        message: 'Song deleted successfully!',
      });

      setTimeout(() => {
        this.setState({ message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error in handleDelete:', error);
      this.setState({ message: 'Failed to delete the song' });
    }
  };

  renderSong = (song) => {
    return (
      <div
        key={song._id}
        className="song-item"
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          margin: '0.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0f7fa')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
      >
        <div>
          <strong>Song Title:</strong> {song.title} <br />
          <strong>Artist:</strong> {song.artist} <br />
          <strong>Duration:</strong> {song.duration}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => this.handleLike(song._id, 'song')} style={likeButtonStyle}>
            <AiFillHeart />
          </button>

          <button onClick={() => this.handleDelete(song._id)} style={deleteButtonStyle}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    );
  };

  renderPlaylist = (playlist) => {
    return (
      <div
        key={playlist._id}
        className="playlist-item"
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '10px',
          margin: '0.5rem 0',
          transition: 'background-color 0.3s',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0f7fa')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
      >
        <div>
          <strong>Playlist Name:</strong> {playlist.name} <br />
          <strong>Category:</strong> {playlist.category || 'N/A'} <br />
          <strong>Description:</strong> {playlist.description || 'No description provided'} <br />
          <strong>Hashtags:</strong> {(playlist.hashtags || []).join(', ')} <br />
          <strong>Songs:</strong>
          <ul>
            {(playlist.songs || []).map((song, i) => (
              <li key={i}>
                {song.title} by {song.artist}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={() => this.handleLike(playlist._id, 'playlist')} style={likeButtonStyle}>
          <AiFillHeart />
        </button>
      </div>
    );
  };

  render() {
    const { songs } = this.props;
    const { message, playlists } = this.state;

    return (
      <div className="feed" style={{ padding: '1rem' }}>
        <h2 style={{ color: '#cf1271', fontSize: '2rem', marginBottom: '1rem' }}>Song Feed</h2>
        <div
          className="song-feed"
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          {songs && songs.length > 0 ? songs.map(this.renderSong) : <p>No songs available</p>}
        </div>

        <h2 style={{ color: '#cf1271', fontSize: '2rem', marginBottom: '1rem' }}>Playlist Feed</h2>
        <div
          className="playlist-feed"
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '0.5rem',
          }}
        >
          {playlists && playlists.length > 0 ? playlists.map(this.renderPlaylist) : <p>No playlists available</p>}
        </div>

        {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      </div>
    );
  }
}

// Styles
const likeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#ffab91',
  fontSize: '1.5rem',
};

const deleteButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#ff4d4d',
  fontSize: '1.5rem',
  marginLeft: '1rem',
};
