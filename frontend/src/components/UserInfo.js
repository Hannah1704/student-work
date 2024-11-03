import React, { useState } from 'react';
import { DeleteProfile } from './DeleteProfile';

export const UserInfo = ({ currentUser, onUpdate }) => {
  const [editableBio, setEditableBio] = useState(currentUser.bio || '');
  const [editablePronouns, setEditablePronouns] = useState(currentUser.pronouns || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const handleSave = async (field) => {
    try 
    {
      let response;
      if(field === 'bio' || field === 'pronouns') 
      {
        response = await fetch(`/api/users/${currentUser._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bio: editableBio, pronouns: editablePronouns })
        });
      } 
      else if (field === 'password') 
      {
        response = await fetch(`/api/users/${currentUser._id}/password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldPassword, newPassword })
        });
      }

      if(response.ok) 
      {
        onUpdate();
      } 
      else 
      {
        alert("Update failed. Please try again.");
      }
    } 
    catch(error) 
    {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.subHeader}>Personal Information</h2>
      
      <div style={styles.fieldContainer}>
        <label>Bio:</label>
        <input
          type="text"
          value={editableBio}
          onChange={(e) => setEditableBio(e.target.value)}
          style={styles.inputField}
        />
        <button style={styles.button} onClick={() => handleSave('bio')}>Save</button>
      </div>

      <div style={styles.fieldContainer}>
        <label>Pronouns:</label>
        <input
          type="text"
          value={editablePronouns}
          onChange={(e) => setEditablePronouns(e.target.value)}
          style={styles.inputField}
        />
        <button style={styles.button} onClick={() => handleSave('pronouns')}>Save</button>
      </div>

      <h3>Change Password</h3>
      <div style={styles.fieldContainer}>
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={styles.inputField}
        />
      </div>
      <div style={styles.fieldContainer}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.inputField}
        />
        <button style={styles.button} onClick={() => handleSave('password')}>Update</button>
      </div>

      <h2 style={styles.subHeader}>Socials</h2>
      <p style={styles.infoText}>
        Follower count: {currentUser.followerCount?.['$numberInt'] || currentUser.followerCount || 0}
      </p>
      <ul style={styles.socialList}>
        {currentUser.socialMedia?.map((platform, index) => (
          <li key={index} style={styles.socialItem}>
            <strong>{platform.platform}:</strong> {platform.handle}
          </li>
        ))}
      </ul>

      <h2 style={styles.subHeader}>Who are you following?</h2>
      {currentUser.followings && currentUser.followings.length > 0 ? (
        <ul style={styles.followingList}>
          {currentUser.followings.map((followedUser, index) => (
            <li key={index} style={styles.followingItem}>{followedUser}</li>
          ))}
        </ul>
      ) : (
        <p style={styles.infoText}>You are not following anyone yet.</p>
      )}

      <DeleteProfile />
    </div>
  );
};

// Styles
const styles = {
  container: 
  {
    padding: '1rem',
  },
  subHeader: 
  {
    color: '#cf1271',
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  infoText: 
  {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  fieldContainer: 
  {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  inputField: 
  {
    border: '2px solid #cf1271',
    borderRadius: '5px',
    padding: '0.5rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    flex: 1,
  },
  button: 
  {
    backgroundColor: '#cf1271',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: 
  {
    backgroundColor: '#a50060', 
  },
  socialList: 
  {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  socialItem: 
  {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  followingList:
  {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  followingItem: 
  {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
};
