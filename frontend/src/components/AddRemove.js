import React, { useEffect, useState } from 'react';

const AddRemove = ({ playlists, onUpdate }) => {
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState({}); 

  useEffect(() => {
    const fetchAvailableSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const songs = await response.json();
        setAvailableSongs(songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAvailableSongs();
  }, []);

  const handleRemoveSong = async (playlistId, songId) => {
    const updatedPlaylist = playlists.find((playlist) => playlist._id === playlistId);
    updatedPlaylist.songs = updatedPlaylist.songs.filter((id) => id !== songId);

    await updatePlaylist(playlistId, updatedPlaylist);
  };

  const handleSongSelect = (playlistId, songId) => {
    setSelectedSongs((prev) => ({
      ...prev,
      [playlistId]: prev[playlistId] ? [...prev[playlistId], songId] : [songId],
    }));
  };

  const handleAddSongs = async (playlistId) => {
    const updatedPlaylist = playlists.find((playlist) => playlist._id === playlistId);
    const newSongs = selectedSongs[playlistId] || [];

    updatedPlaylist.songs.push(...newSongs);

    await updatePlaylist(playlistId, updatedPlaylist);
    setSelectedSongs((prev) => ({ ...prev, [playlistId]: [] })); 
  };

  const updatePlaylist = async (playlistId, updatedPlaylist) => {
    try {
      const response = await fetch(`http://localhost:3000/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlaylist),
      });

      if (!response.ok) {
        throw new Error('Failed to update playlist');
      }

      onUpdate(); 
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  return (
    <div style={{ padding: '1rem', marginTop: '2rem' }}>
      <h2 style={{ color: '#cf1271' }}>Add or remove songs from existing playlists</h2>
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          style={{
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ textAlign: 'center', fontSize: '1.5rem', color: '#333' }}>{playlist.name}</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {playlist.songs.map((songId) => {
              const song = availableSongs.find((s) => s._id === songId);
              return (
                <li key={songId} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                  {song ? (
                    <span>{song.title} by {song.artist}</span>
                  ) : (
                    <span>Song not found</span>
                  )}
                  <button
                    onClick={() => handleRemoveSong(playlist._id, songId)}
                    style={{ marginLeft: '1rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <h4 style={{ fontWeight: 'bold', marginTop: '1rem' }}>Add Songs:</h4>
          <div>
            {availableSongs.map((song) => (
              <div key={song._id} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedSongs[playlist._id]?.includes(song._id) || false}
                  onChange={() => handleSongSelect(playlist._id, song._id)}
                />
                <span style={{ marginLeft: '0.5rem' }}>{song.title} by {song.artist}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleAddSongs(playlist._id)}
            style={{
              marginTop: '1rem',
              backgroundColor: '#ffab91',
              color: '#fff',
              padding: '0.5rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Selected Songs
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddRemove;
