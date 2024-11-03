import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

export class LoginForm extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      loginSuccess: false, 
      errorMessage: '', 
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { username, password } = this.state;
    let usernameError = '';
    let passwordError = '';

    const usernameRegex = /^[a-zA-Z]+$/;
    if(!usernameRegex.test(username)) 
    {
      usernameError = 'Username should not contain symbols or numbers.';
    }

    if(password.length < 5) 
    {
      passwordError = 'Password must be greater than 4 characters.';
    }

    if (usernameError || passwordError) 
    {
      this.setState({ usernameError, passwordError });
      return false;
    }
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.validateForm()) 
    {
      const { username, password } = this.state;

      try 
      {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if(response.ok) 
        {
          const data = await response.json();
          console.log('Login successful:', data);

          localStorage.setItem('currentUser', JSON.stringify(data));

          this.setState({ loginSuccess: true, errorMessage: '' });
        } 
        else if(response.status === 404) 
        {
          this.setState({ errorMessage: 'User not found. Please check your username or sign up.' });
        } 
        else 
        {
          this.setState({ errorMessage: 'Login failed. Please try again.' });
        }
      } 
      catch(error) 
      {
        console.error('Error logging in:', error);
        this.setState({ errorMessage: 'An error occurred while logging in. Please try again.' });
      }
    }
  };

  render() 
  {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <div style={{ color: 'red' }}>{this.state.usernameError}</div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <div style={{ color: 'red' }}>{this.state.passwordError}</div>

          <button type="submit">Login</button>
        </form>

        {this.state.errorMessage && (
          <div style={{ color: 'red' }}>
            <p>{this.state.errorMessage}</p>
          </div>
        )}

        {this.state.loginSuccess && (
          <div>
          <p>Login successful! Go to the home page:</p>
          <Link 
            to="/home" 
            id="HomeLink"
            style={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'white',
              backgroundColor: 'green',
              padding: '10px 20px',
              borderRadius: '5px',
              display: 'inline-block',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'darkgreen'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'green'}
          >
            Home
          </Link>
        </div>
        
        )}
      </div>
    );
  }
}
