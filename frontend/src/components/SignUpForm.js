import React from 'react';

export class SignUpForm extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
      successMessage: '', 
      errorMessage: '',   
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { username, password, confirmPassword } = this.state;
    let usernameError = '';
    let passwordError = '';
    let confirmPasswordError = '';
  
    const trimmedUsername = username.trim();
  
    const usernameRegex = /^[a-zA-Z]+$/;
    if(!usernameRegex.test(trimmedUsername)) 
    {
      usernameError = 'Username should not contain symbols or numbers.';
    }
  
    if(password.length < 5) 
    {
      passwordError = 'Password must be greater than 4 characters.';
    }
  
    if(password !== confirmPassword) 
    {
      confirmPasswordError = 'Passwords do not match.';
    }
  
    if(usernameError || passwordError || confirmPasswordError) 
    {
      this.setState({ usernameError, passwordError, confirmPasswordError });
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
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, followerCount: 0 }),
        });

        if(response.ok) 
        {
          const result = await response.json();
          this.setState({ successMessage: 'Sign up successful!', errorMessage: '' });
          console.log('User signed up with ID:', result);
          this.setState({ username: '', password: '', confirmPassword: '' });
        } 
        else 
        {
          const errorData = await response.text();
          this.setState({ errorMessage: errorData, successMessage: '' });
        }
      } 
      catch(error) 
      {
        console.error('Error during signup:', error);
        this.setState({ errorMessage: 'An error occurred during signup.', successMessage: '' });
      }
    }
  };

  render() 
  {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2> Sign Up</h2>
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
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          required
        />
        <div style={{ color: 'red' }}>{this.state.confirmPasswordError}</div>

        <button type="submit">Sign Up</button>
        
        {this.state.successMessage && <div style={{ color: 'green' }}>{this.state.successMessage}</div>}
        {this.state.errorMessage && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>}
      </form>
    );
  }
}
