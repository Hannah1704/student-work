import React, { useState } from 'react';

const EditPlaylist = ({ playlistId, currentName, onEditSuccess }) => {
  const [name, setName] = useState(currentName);
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try 
    {
      const response = await fetch(`http://localhost:3000/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), 
      });
      
      if(!response.ok)
      {
        throw new Error('Failed to update the playlist name');
      }

      onEditSuccess(); 
      alert('Playlist name updated successfully!'); 
    } 
    catch(error) 
    {
      console.error('Error updating playlist:', error);
      alert('Failed to update the playlist name');
    }
  };

  return (
    <form onSubmit={handleUpdate} style={{ display: 'inline-block', marginLeft: '1rem' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ marginRight: '0.5rem', padding: '0.5rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#cf1271', color: '#fff' }}>
        Update
      </button>
    </form>
  );
};

export default EditPlaylist;
