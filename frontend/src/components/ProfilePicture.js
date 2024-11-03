// import React from 'react';

// export class ProfilePicture extends React.Component 
// {
//   render() 
//   {
//     const { profilePicture } = this.props;
//     const imageUrl = profilePicture || '/assets/images/defaultImage01.jpeg';

//     return (
//       <div style={styles.container}>
//         <img src={imageUrl} alt="Profile" style={styles.image} />
//       </div>
//     );
//   }
// }

// const styles = {
//   container: 
//   {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '1rem',
//   },
//   image: 
//   {
//     width: '150px',
//     height: '150px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//   },
// };

// export default ProfilePicture;

import React, { useState } from 'react';

export const ProfilePicture = ({ profilePicture, userId, onUpdateProfilePicture }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(profilePicture || '/assets/images/defaultImage01.jpeg');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/updateProfilePicture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, profilePicture: newImageUrl }),
      });

      if (response.ok) 
      {
        onUpdateProfilePicture(newImageUrl); 
        setIsEditing(false); 
      } 
      else 
      {
        console.error('Failed to update profile picture');
      }
    } 
    catch(error) 
    {
      console.error('Error updating profile picture:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); 
  };

  return (
    <div style={styles.container}>
      <img src={newImageUrl} alt="Profile" style={styles.image} />
      {isEditing ? (
        <div style={styles.editContainer}>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            style={styles.input}
            placeholder="Enter new image URL"
          />
          <button onClick={handleSaveClick} style={styles.saveButton}>Save</button>
          <button onClick={handleCancelClick} style={styles.cancelButton}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick} style={styles.editButton}>Edit</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    flexDirection: 'column', 
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    marginBottom: '1rem', 
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginRight: '1rem',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  saveButton: {
    marginRight: '0.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProfilePicture;
