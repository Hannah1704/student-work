import React, { useState, useEffect } from 'react';

export const PossibleFriends = ({ followings }) => {
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [requestSent, setRequestSent] = useState({});

  useEffect(() => {
    fetchPotentialFriends();
  }, []);

  const fetchPotentialFriends = async () => {
    try 
    {
      const response = await fetch('/api/get-potential-friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followings }),
      });
      const data = await response.json();
      setPotentialFriends(data);
    } 
    catch(error) 
    {
      console.error('Error fetching potential friends:', error);
    }
  };

  const handleFriendRequest = (userId) => {
    setRequestSent((prev) => ({ ...prev, [userId]: true }));
    alert('Friend request sent!');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Possible Friends</h2>
      <ul style={styles.list}>
        {potentialFriends.map((user) => (
          <li key={user._id} style={styles.userItem}>
            <img
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              style={styles.profilePicture}
            />
            <span>{user.username}</span>
            {requestSent[user._id] ? (
              <span style={styles.requested}>Requested</span>
            ) : (
              <button
                style={styles.requestButton}
                onClick={() => handleFriendRequest(user._id)}
              >
                Send Friend Request
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: 
  {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  heading: 
  {
    fontSize: '1.5rem',
    color: '#cf1271',
    marginBottom: '1rem',
  },
  list: 
  {
    listStyle: 'none',
    padding: 0,
  },
  userItem: 
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
  },
  profilePicture: 
  {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  requestButton: 
  {
    padding: '0.4rem 0.8rem',
    color: '#fff',
    backgroundColor: '#cf1271',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  requested: 
  {
    color: '#888',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
};
