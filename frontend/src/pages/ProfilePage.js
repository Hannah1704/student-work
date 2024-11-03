import React, { Component } from 'react';
import { ProfilePicture } from '../components/ProfilePicture';
import { UserInfo } from '../components/UserInfo';
import { CreatedPlaylists } from '../components/CreatedPlaylists';
import { SavedPlaylists } from '../components/SavedPlaylists';
import { PossibleFriends } from '../components/PossibleFriends';
import { Friends } from '../components/Friends';

export class ProfilePage extends Component 
{
  state = {
    currentUser: null,
  };

  componentDidMount() 
  {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if(!user) 
    {
      try 
      {
        const response = await fetch('/api/users/profile');
        user = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(user));
      } 
      catch(error) 
      {
        console.error('Error fetching user data:', error);
      }
    }

    if(user)
    {
      this.setState({ currentUser: user });
    }
  };

  render() 
  {
    const { currentUser } = this.state;

    if(!currentUser) 
    {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-page" style={styles.page}>
        <h1 style={styles.header}>Profile</h1>

        <ProfilePicture profilePicture={currentUser.profilePicture} />
        <UserInfo currentUser={currentUser} onUpdate={this.fetchUserData} />

        <div style={styles.playlistsContainer}>
          {/* <CreatedPlaylists
            createdPlaylists={currentUser.createdPlaylists}
            userName={currentUser.username}
          /> */}
          <CreatedPlaylists createdPlaylists={this.state.currentUser.createdPlaylists} userName={this.state.currentUser.username} />

          {/* <SavedPlaylists
            savedPlaylists={currentUser.savedPlaylists}
            userName={currentUser.username}
          /> */}

      <SavedPlaylists savedPlaylists={this.state.currentUser.savedPlaylists} userName={this.state.currentUser.username} />

        </div>

        <PossibleFriends followings={currentUser.followings} />

        <Friends /> 
      </div>
    );
  }
}

// Styles
const styles = {
  page: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    color: '#cf1271',
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    animation: 'wave 1s infinite alternate',
  },
  playlistsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
};
