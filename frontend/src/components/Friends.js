import React, { Component } from 'react';

export class Friends extends Component 
{
  state = {
    friendsData: [], 
    error: null,
  };

  componentDidMount() 
  {
    this.fetchFriendsData();
  }

  fetchFriendsData = async () => {
    const { followings } = this.props;

    if(!followings || followings.length === 0) 
    {
      return; 
    }

    try 
    {
      const friendsDataPromises = followings.map(async (friendId) => {
        const response = await fetch(`/api/users/${friendId}`); 
        if(!response.ok)
        {
          throw new Error('Failed to fetch friend data');
        }
        return await response.json();
      });

      const friendsData = await Promise.all(friendsDataPromises);
      this.setState({ friendsData: friendsData.filter(friend => friend) });
    } 
    catch(error) 
    {
      this.setState({ error: error.message });
    }
  };

  handleUnfollow = async (friendId) => {
    try 
    {
      const response = await fetch(`/api/users/unfollow`, 
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
      });

      if(response.ok) 
      {
        this.setState((prevState) => ({
          friendsData: prevState.friendsData.filter(friend => friend._id !== friendId),
        }));
      } 
      else 
      {
        throw new Error('Failed to unfollow');
      }
    } 
    catch(error) 
    {
      console.error(error.message);
    }
  };

  render() 
  {
    const { friendsData, error } = this.state;

    if(error) 
    {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h2>Your Friends</h2>
        {friendsData.length > 0 ? (
          friendsData.map(friend => (
            <div key={friend._id}>
              <h3>{friend.username}</h3>
              <p>{friend.bio}</p>
              <h4>Created Playlists:</h4>
              <ul>
                {friend.createdPlaylists.map(playlistId => (
                  <li key={playlistId}>{playlistId}</li> 
                ))}
              </ul>
              <button onClick={() => this.handleUnfollow(friend._id)}>Unfollow</button>
            </div>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    );
  }
}
