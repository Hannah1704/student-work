import React from 'react';
import { ProfilePreview } from '../components/ProfilePreview';
import { Feed } from '../components/Feed';
import { AddToPlaylist } from '../components/AddToPlaylist'; // AddToPlaylist Component

export class ProfilePage extends React.Component {
  render() {
    const profile = { username: 'JohnDoe', followerCount: 150 };
    const playlists = [
      { name: 'My Playlist 1', songCount: 10 },
      { name: 'My Playlist 2', songCount: 7 },
    ];

    const followers = [
      { username: 'JaneDoe', followerCount: 200 },
      { username: 'MikeSmith', followerCount: 180 },
    ];

    return (
      <div className="profile-page">
        <h1>Profile</h1>
        <ProfilePreview {...profile} />
        <h2>Your Playlists</h2>
        <AddToPlaylist /> {/* AddToPlaylist Component */}
        <Feed songs={[]} playlists={playlists} />
        <h2>Followers</h2>
        {followers.map((follower, index) => (
          <ProfilePreview key={index} {...follower} />
        ))}
      </div>
    );
  }
}
