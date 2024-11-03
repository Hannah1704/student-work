import React from 'react';

export class ProfilePreview extends React.Component 
{
  render() {
    const { username, followerCount } = this.props;
    return (
      <div className="profile-preview">
        <h4>{username}</h4>
        <p>{followerCount} followers</p>
      </div>
    );
  }
}
