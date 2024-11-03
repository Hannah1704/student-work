import React from 'react';
import { Feed } from '../components/Feed';
import { SearchInput } from '../components/SearchInput';
import { AddToPlaylist } from '../components/AddToPlaylist';
import { CreateSong } from '../components/CreateSong'; 

export class HomePage extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      songs: [],
      playlists: [],
    };
  }

  async componentDidMount() 
  {
    await this.fetchSongs();
    await this.fetchPlaylists();
  }

  fetchSongs = async () => {
    try 
    {
      const response = await fetch('http://localhost:3000/api/songs');
      if(response.ok) 
      {
        const data = await response.json();
        this.setState({ songs: data });
      } 
      else 
      {
        console.log('Error fetching songs');
      }
    } 
    catch(error) 
    {
      console.error('Error during fetching songs:', error);
    }
  };

  fetchPlaylists = async () => {
    try 
    {
      const response = await fetch('http://localhost:3000/api/playlists');
      if(response.ok) 
      {
        const data = await response.json();
        this.setState({ playlists: data });
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

  render() 
  {
    const { songs, playlists } = this.state;

    return (
      <div className="home-page">
        <SearchInput />
        <CreateSong />
        <Feed songs={songs} playlists={playlists} showDetails={false} />
      </div>
    );
  }
}
