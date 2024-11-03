import React, { Component } from 'react';

export class DeleteProfile extends Component 
{
  handleDelete = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(!currentUser)
    {
      return;
    }

    try 
    {
      const response = await fetch(`http://localhost:30000/api/users/${currentUser._id}`, {
        method: 'DELETE',
      });

      if(response.ok)
      {
        localStorage.removeItem('currentUser'); 
        window.location.href = '/'; 
      } 
      else 
      {
        console.log('Failed to delete profile:', await response.text());
      }
    } 
    catch(error) 
    {
      console.error('Error deleting profile:', error);
    }
  };

  render() 
  {
    return (
      <div style={styles.deleteSection}>
        <h2 style={styles.deleteHeader}>Delete Profile</h2>
        <p style={styles.deleteText}>Are you sure you want to delete your profile? This action cannot be undone.</p>
        <button onClick={this.handleDelete} style={styles.deleteButton}>
          Delete Profile
        </button>
      </div>
    );
  }
}

// Styles
const styles = {
  deleteSection: 
  {
    marginTop: '2rem',
    padding: '1rem',
    border: '1px solid #cf1271',
    borderRadius: '10px',
    backgroundColor: '#ffebee',
  },
  deleteHeader: 
  {
    color: '#cf1271',
    fontSize: '1.8rem',
  },
  deleteText: 
  {
    fontSize: '1.1rem',
  },
  deleteButton: 
  {
    backgroundColor: '#cf1271',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

styles.deleteButton.onMouseOver = 
{
  backgroundColor: '#d81b60',
};
