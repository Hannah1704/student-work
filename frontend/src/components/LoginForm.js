import React from 'react';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { username, password } = this.state;
    let usernameError = '';
    let passwordError = '';

    // Username validation (no symbols or numbers)
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
      usernameError = 'Username should not contain symbols or numbers.';
    }

    // Password validation (at least 5 characters)
    if (password.length < 5) {
      passwordError = 'Password must be greater than 4 characters.';
    }

    // Set the errors in the state
    if (usernameError || passwordError) {
      this.setState({ usernameError, passwordError });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { username, password } = this.state;
      console.log('Logging in:', { username, password });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
    );
  }
}
