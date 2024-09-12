import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';

export class SplashPage extends React.Component {
  render() {
    return (
      <div className="splash-page">

        <h2>Hello and welcome</h2>
        <div className="auth-forms">
          <h2>Login</h2>
          <LoginForm />
          <h2>Sign Up</h2>
          <SignUpForm />
        </div>

      </div>
    );
  }
}
