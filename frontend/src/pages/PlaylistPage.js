import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { CreatePlaylist } from '../components/CreatePlaylist';
import EditPlaylist from '../components/EditPlaylist';
import AddRemove from '../components/AddRemove';

export class PlaylistPage extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      playlists: [],
      likedPlaylists: [],
      message: '',
    };

    this.fetchPlaylists = this.fetchPlaylists.bind(this);
  }

  async componentDidMount() 
  {
    await this.fetchPlaylists();
  }

  fetchPlaylists = async () => {
    try 
    {
      const response = await fetch('http://localhost:3000/api/playlists');
      if(response.ok) 
      {
        const playlistsData = await response.json();
        
        const playlistsWithSongs = await Promise.all(
          playlistsData.map(async (playlist) => {
            const songsWithDetails = await Promise.all(
              playlist.songs.map(async (songId) => {
                const songResponse = await fetch(`http://localhost:3000/api/songs/${songId}`);
                if(songResponse.ok) 
                {
                  return songResponse.json();
                }
                return null;
              })
            );
            return { ...playlist, songs: songsWithDetails.filter(Boolean) }; 
          })
        );

        this.setState({ playlists: playlistsWithSongs });
      } 
      else 
      {
        console.log('Error fetching playlists');
      }
    } 
    catch(error) 
    {
      console.error('Error during fetching playlists:', error);
    }
  };

  handleLike = async (playlistId) => {

  };

  handleDeletePlaylist = async (playlistId) => {

  };

  handleEditSuccess = () => {
    this.fetchPlaylists();
  };

  renderPlaylist = (playlist) => {
    const isLiked = this.state.likedPlaylists.includes(playlist._id);
  
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => this.handleLike(playlist._id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isLiked ? '#ff8a65' : '#ffab91',
              fontSize: '1.5rem',
              transition: 'color 0.3s',
            }}
          >
            <AiFillHeart />
          </button>
          <EditPlaylist playlistId={playlist._id} currentName={playlist.name} onEditSuccess={this.handleEditSuccess} />
          <button
            onClick={() => this.handleDeletePlaylist(playlist._id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#cf1271',
              fontSize: '1.5rem',
              marginLeft: '1rem',
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };
  

  render() {
    const { playlists, message } = this.state;

    return (
      <div className="playlist-page" style={{ padding: '1rem' }}>
        <h2 style={{ color: '#cf1271', fontSize: '2rem', marginBottom: '1rem' }}>All Playlists</h2>

        <CreatePlaylist onPlaylistCreated={this.fetchPlaylists} />

        <div
          className="playlist-feed"
          style={{
            maxHeight: '400px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '0.5rem',
            marginTop: '1rem',
          }}
        >
          {playlists.length > 0 ? (
            playlists.map(this.renderPlaylist)
          ) : (
            <p>No playlists available</p>
          )}
        </div>

        {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}

        <AddRemove playlists={this.state.playlists} onUpdate={this.fetchPlaylists} />

      </div>
    );
  }
}
