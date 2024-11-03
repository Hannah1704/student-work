import React, { useState, useEffect } from 'react';

export const CreatePlaylist = ({ onPlaylistCreated }) => {
  const [name, setName] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [coverImage, setCoverImage] = useState(''); 
  const [hashtags, setHashtags] = useState(''); 
  const [songs, setSongs] = useState([]); 
  const [message, setMessage] = useState(''); 
  const [availableSongs, setAvailableSongs] = useState([]); 
  const [selectedSongId, setSelectedSongId] = useState(''); 

  const categories = ['Pop', 'Old School', 'Hip Hop', 'Chill', 'Rock', 'Blues'];

  useEffect(() => {
    const fetchSongs = async () => {
      try 
      {
        const response = await fetch('http://localhost:3000/api/songs'); 

        if(!response.ok) 
        {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setAvailableSongs(data); 
      } 
      catch (error) 
      {
        console.error('Error fetching songs:', error);
        setMessage('Failed to load songs');
      }
    };

    fetchSongs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const playlistName = name.trim() || 'MyPlaylist'; 
    const uniqueSongs = Array.from(new Set(songs));

    try 
    {
      const response = await fetch('http://localhost:3000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          category,
          description,
          coverImage,
          hashtags: hashtags.split(',').map(tag => tag.trim()),
          songs: uniqueSongs, 
        }),
      });

      if(!response.ok) 
      {
        throw new Error('Being processed - refresh to reflect');
      }

      const playlistId = await response.json();
      setMessage('Playlist created successfully!');

      setName('');
      setCategory('');
      setDescription('');
      setCoverImage('');
      setHashtags('');
      setSongs([]); 
      setSelectedSongId(''); 
      onPlaylistCreated(playlistId); 

      setTimeout(() => {
        setMessage('');
      }, 2000);
    } 
    catch(error)
    {
      console.error('Error creating playlist:', error);
      setMessage('Being processed - refresh to reflect');
    }
  };

  const handleSongSelect = (e) => {
    setSelectedSongId(e.target.value); 
  };

  const handleAddSong = () => {
    if(selectedSongId && !songs.includes(selectedSongId)) 
    {
      setSongs((prevSongs) => [...prevSongs, selectedSongId]); 
      setSelectedSongId('');
    } 
    else 
    {
      alert("This song is already in the playlist or no song selected!");
    }
  };

  const handleRemoveSong = (songId) => {
    setSongs((prevSongs) => prevSongs.filter(id => id !== songId)); 
  };

  return (
    <div className="create-playlist" style={{ marginBottom: '2rem' }}>
      <h2 style={{ color: '#cf1271', fontSize: '2rem', marginBottom: '1rem' }}>Create a New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Playlist Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Short Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Cover Image URL:
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              style={{ marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Hashtags (comma-separated):
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Select Songs:
            <select value={selectedSongId} onChange={handleSongSelect} style={{ marginLeft: '0.5rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="">Select a song</option>
              {availableSongs.map((song) => (
                <option key={song._id} value={song._id}>{song.title}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddSong}
              style={{
                marginLeft: '0.5rem',
                backgroundColor: '#ffab91',
                color: '#fff',
                padding: '0.5rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Add to List
            </button>
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Selected Songs:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {songs.map(songId => {
              const song = availableSongs.find(s => s._id === songId); // Use _id here
              return (
                song && (
                  <div key={songId} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '5px' }}>
                    {song.title}
                    <button
                      type="button"
                      onClick={() => handleRemoveSong(songId)}
                      style={{ marginLeft: '0.5rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      X
                    </button>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#ffab91',
            color: '#fff',
            padding: '0.5rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Create Playlist
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};
