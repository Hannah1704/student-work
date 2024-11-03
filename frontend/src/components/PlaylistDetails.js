import React from 'react';

export class PlaylistDetails extends React.Component 
{
  render() 
  {
    const { playlists = [] } = this.props;  

    return (
      <div className="playlist-page">
        <h2 className="page-title">All Playlists</h2>

        {playlists.length > 0 ? (
          playlists.map((playlist, index) => (
            <div key={index} className="playlist-item">
              <h3 className="playlist-name">{playlist.name}</h3>
              <p>
                {playlist.songs ? playlist.songs.length : 0} {playlist.songs?.length === 1 ? 'song' : 'songs'}
              </p>

              <ul className="song-list">
                {playlist.songs?.map((song, songIndex) => (
                  <li key={songIndex} className="song-item">
                    <strong>{song.title}</strong> by {song.artist} 
                    <span className="song-duration">({song.duration})</span>
                  </li>
                )) || <p>No songs available</p>}
              </ul>
            </div>
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>
    );
  }
}
