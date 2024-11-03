import React from 'react';

export class FriendRequest extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            users: [],
            message: '',
        };
    }

    async componentDidMount() 
    {
        await this.fetchUsers(); 
    }

    fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users'); 
            if(response.ok) 
            {
                const data = await response.json();
                this.setState({ users: data });
            } 
            else 
            {
                console.log('Error fetching users');
            }
        } 
        catch(error) 
        {
            console.error('Error during fetching users:', error);
        }
    };

    handleFriendRequest = async (username) => {
        try {
            const response = await fetch('/api/friend-request', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }), 
            });

            if(!response.ok) 
            {
                throw new Error('Failed to send friend request');
            }

            const data = await response.json();
            this.setState({ message: 'Friend request sent successfully!' });

            setTimeout(() => {
                this.setState({ message: '' });
            }, 2000);
        } 
        catch(error) 
        {
            console.error('Error in handleFriendRequest:', error);
            this.setState({ message: 'Failed to send friend request' });
        }
    };

    render() 
    {
        const { users, message } = this.state;

        return (
            <div className="friend-request-page" style={{ padding: '1rem' }}>
                <h2 style={{ color: '#cf1271', fontSize: '2rem', marginBottom: '1rem' }}>Users</h2>

                <div className="user-list">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div key={user._id} style={{ margin: '0.5rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <strong>{user.username}</strong>
                                <p>{user.bio}</p>
                                <button onClick={() => this.handleFriendRequest(user.username)} style={{ backgroundColor: '#cf1271', color: '#fff', border: 'none', borderRadius: '5px', padding: '0.5rem 1rem' }}>
                                    Send Friend Request
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No users available</p>
                    )}
                </div>

                {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
            </div>
        );
    }
}
