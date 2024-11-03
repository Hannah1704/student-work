import React from 'react';
import { Song } from './Song';

export class PlaylistPreview extends React.Component 
{
  render() 
  {
    const { name, songs = [], showDetails } = this.props;  

    return (
      <div className="playlist-preview">
        <h4>{name}</h4>

        {showDetails ? (
          <div>
            <p>{songs.length} {songs.length === 1 ? 'song' : 'songs'}</p>
            <div className="playlist-songs">
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <Song
                    key={index}   
                    title={song.title}
                    artist={song.artist}
                    duration={song.duration}
                  />
                ))
              ) : (
                <p>No songs in this playlist</p>
              )}
            </div>
          </div>
        ) : (
          <p>Playlist preview</p>  
        )}
      </div>
    );
  }
}
