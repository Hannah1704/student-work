import React, { Component } from 'react';

class PersonalInfoBlock extends Component 
{
  state = {
    user: null,
    loading: true,
    error: null,
  };

  componentDidMount() 
  {
    this.fetchUserData();
  }

  async fetchUserData() 
  {
    try 
    {
      const response = await fetch('/api/users'); 
      if(!response.ok) 
      {
        throw new Error('Network response was not ok');
      }
      const userData = await response.json();
      this.setState({ user: userData, loading: false });
    } 
    catch(error) 
    {
      console.error('Error fetching user data:', error);
      this.setState({ error: error.message, loading: false });
    }
  }

  render() 
  {
    const { user, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="personal-info-block">
        <h2 className="font-bold">Personal Information</h2>
        <p>Name: {user.username}</p>
        <p>Pronouns: {user.pronouns || 'N/A'}</p>
        <p>Bio: {user.bio || 'N/A'}</p>
        
        <h3 className="font-bold">Socials</h3>
        <p>Follower count: {user.followerCount?.['$numberInt'] || user.followerCount || 0}</p>
        <p>Platforms:</p>
        <ul>
          {user.socials?.map((platform) => (
            <li key={platform.name}>
              <strong>{platform.name}:</strong> {platform.handle}
            </li>
          ))}
        </ul>

        <h3 className="font-bold">Who are you following?</h3>
        <ul>
          {user.followings?.map((following) => (
            <li key={following}>{following}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PersonalInfoBlock;
