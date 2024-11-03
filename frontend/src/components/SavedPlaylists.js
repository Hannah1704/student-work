import React, { Component } from 'react';

export class SavedPlaylists extends Component {
  state = {
    playlists: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchPlaylists();
  }

  fetchPlaylists = async () => {
    const { savedPlaylists } = this.props;

    try {
      const playlistRequests = savedPlaylists.map(id =>
        fetch(`/api/playlists/${id}`).then(response => response.json())
      );

      const playlists = await Promise.all(playlistRequests);
      this.setState({ playlists, loading: false });
    } catch (error) {
      console.error('Error fetching saved playlists:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { playlists, loading } = this.state;
    const { userName } = this.props;

    if (loading) {
      return <p>Loading saved playlists...</p>;
    }

    return (
      <div className="saved-playlists" style={styles.container}>
        <h2 style={styles.header}>{userName}'s Saved Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist._id} style={styles.playlistItem}>
              <h3><strong>{playlist.name}</strong></h3>
              <p><strong>Category:</strong> {playlist.category || 'N/A'}</p>
              <p><strong>Description:</strong> {playlist.description || 'No description provided'}</p>
              <img src={playlist.coverImage} alt={playlist.name} style={styles.coverImage} />
              <p><strong>Hashtags:</strong> {playlist.hashtags.join(', ') || 'No hashtags'}</p>
              <p><strong>Song Count:</strong> {playlist.songs.length}</p>
              <ul>
                {playlist.songs.map((songId, index) => (
                  <li key={index}>
                    {/* Fetch the song title and artist based on the songId */}
                    <SongDetails songId={songId} />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No saved playlists available</p>
        )}
      </div>
    );
  }
}

// New component to fetch song details based on songId
class SongDetails extends Component {
  state = {
    song: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchSongDetails();
  }

  fetchSongDetails = async () => {
    const { songId } = this.props;

    try {
      const response = await fetch(`/api/songs/${songId}`);
      if (response.ok) {
        const songData = await response.json();
        this.setState({ song: songData, loading: false });
      } else {
        throw new Error('Failed to fetch song details');
      }
    } catch (error) {
      console.error('Error fetching song details:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { song, loading } = this.state;

    if (loading) {
      return <p>Loading song...</p>;
    }

    return song ? (
      <>
        {song.title} by {song.artist}
      </>
    ) : (
      <p>Song not found</p>
    );
  }
}

// Styles
const styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '1.5rem',
  },
  header: {
    color: '#cf1271',
    fontSize: '1.8rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  playlistItem: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  coverImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    margin: '0.5rem 0',
  },
};
