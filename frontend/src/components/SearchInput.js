import React from 'react';

export class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
    };
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value.replace('#', '') });
  };

  handleSearch = async () => {
    const { searchTerm } = this.state;

    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:3000/api/search?q=${searchTerm}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          this.setState({ searchResults: data });
          console.log('Search results:', data);
        } else {
          console.log('Error fetching search results');
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  };

  handleSavePlaylist = async (playlistId) => {
    await fetch(`http://localhost:3000/api/user/savePlaylist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playlistId }),
    });
    alert('Playlist added to savedPlaylists');
  };

  handleLikeSong = async (songId) => {
    await fetch(`http://localhost:3000/api/user/likeSong`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId }),
    });
    alert('Song added to likedSongs');
  };

  handleAddFriend = async (userId) => {
    await fetch(`http://localhost:3000/api/user/addFriend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    alert('User added to followings');
  };

  handleHashtagClick = (hashtag) => {
    // Update searchTerm with the selected hashtag and trigger search
    this.setState({ searchTerm: hashtag }, () => {
      this.handleSearch();
    });
  };

  renderResult = (result) => {
    const currentUser = {};

    if (result.title && result.artist && result.duration) {
      return (
        <li key={result._id}>
          <strong>Song Title:</strong> {result.title} <br />
          <strong>Artist:</strong> {result.artist} <br />
          <strong>Duration:</strong> {result.duration} <br />
          {result.hashtags && (
            <div>
              <strong>Hashtags:</strong> {result.hashtags.map((tag) => (
                <span 
                  key={tag} 
                  onClick={() => this.handleHashtagClick(`#${tag}`)} 
                  style={{ cursor: 'pointer', color: '#cf1271', marginRight: '5px' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <button onClick={() => this.handleLikeSong(result._id)} style={{ backgroundColor: 'blue', color: 'white' }}>
            <strong>Like Song</strong>
          </button>
          <br /><br />
        </li>
      );
    } else if (result.username) {
      const isFriend = currentUser.followings?.includes(result._id);
      return (
        <li key={result._id}>
          <strong>Username:</strong> {result.username} <br />
          <strong>Follower Count:</strong> {result.followerCount} <br />
          <strong>Bio:</strong> {result.bio} <br />
          {!isFriend && (
            <button onClick={() => this.handleAddFriend(result._id)} style={{ backgroundColor: 'blue', color: 'white' }}>
              <strong>Friend</strong>
            </button>
          )}
          <br /><br />
        </li>
      );
    } else if (result.name && result.songs) {
      return (
        <li key={result._id}>
          <strong>Playlist Name:</strong> {result.name} <br />
          <strong>Song Count:</strong> {result.songs.length} <br />
          {result.hashtags && (
            <div>
              <strong>Hashtags:</strong> {result.hashtags.map((tag) => (
                <span 
                  key={tag} 
                  onClick={() => this.handleHashtagClick(`#${tag}`)} 
                  style={{ cursor: 'pointer', color: '#cf1271', marginRight: '5px' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <button onClick={() => this.handleSavePlaylist(result._id)} style={{ backgroundColor: 'blue', color: 'white' }}>
            Save Playlist
          </button>
          <br /><br />
        </li>
      );
    } else if (result.hashtag) {
      return (
        <li key={result.hashtag} onClick={() => this.handleHashtagClick(result.hashtag)}>
          <strong>#{result.hashtag}</strong>
          <br /><br />
        </li>
      );
    }
    return null;
  };

  render() {
    const { searchTerm, searchResults } = this.state;

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <input
          type="text"
          placeholder="Search playlists, songs, or usernames"
          value={searchTerm}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          style={{
            padding: '0.8rem',
            width: '300px',
            borderRadius: '25px',
            border: '2px solid #cf1271',
            outline: 'none',
            fontSize: '1.2rem',
            color: '#330df3',
            backgroundColor: '#55ccff',
            transition: 'background-color 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => (e.target.style.backgroundColor = '#e5e5f7')}
          onBlur={(e) => (e.target.style.backgroundColor = '#55ccff')}
        />
        <button
          onClick={this.handleSearch}
          style={{
            marginLeft: '1rem',
            padding: '0.8rem 1.5rem',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#cf1271',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#dba2f6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#cf1271')}
        >
          Search
        </button>

        {searchResults.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3
              style={{
                fontSize: '1.5rem',
                color: '#cf1271',
                letterSpacing: '0.2rem',
              }}
            >
              Search Results:
            </h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {searchResults.map(this.renderResult)}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
