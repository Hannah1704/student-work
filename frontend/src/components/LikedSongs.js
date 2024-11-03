import React from 'react';

export class LikedSongs extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      likedSongs: [],
      loading: true,
      error: null,
    };
  }

  async componentDidMount() 
  {
    await this.fetchLikedSongs();
  }

  fetchLikedSongs = async () => {
    try 
    {
      const userId = this.props.userId; 
      const response = await fetch(`http://localhost:3000/api/users/${userId}/likedSongs`);
      
      if(response.ok) 
      {
        const data = await response.json();
        this.setState({ likedSongs: data.likedSongs, loading: false });
      } 
      else 
      {
        console.error('Error fetching liked songs:', response.status);
        this.setState({ error: 'Failed to fetch liked songs', loading: false });
      }
    } 
    catch(error) 
    {
      console.error('Error during fetching liked songs:', error);
      this.setState({ error: 'Internal Server Error', loading: false });
    }
  };

  render() 
  {
    const { likedSongs, loading, error } = this.state;

    if(loading) 
    {
      return <p>Loading liked songs...</p>;
    }

    if(error) 
    {
      return <p>{error}</p>;
    }

    return (
      <div className="liked-songs">
        <h4>My Liked Songs</h4>
        <ul>
          {likedSongs.map(song => (
            <li key={song._id}>
              {song.title} by {song.artist}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
