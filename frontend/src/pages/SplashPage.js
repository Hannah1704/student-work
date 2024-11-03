import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import '../styles/SplashPage.css';

export class SplashPage extends React.Component 
{
  render() 
  {
    return (
      <div className="splash-page" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <h2>Are you ready to get down?</h2>
        <p 
          style={{
            fontSize: '1.2rem',
            transition: 'font-size 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.fontSize = '1.4rem')}
          onMouseOut={(e) => (e.currentTarget.style.fontSize = '1.2rem')}
        >
          Hello and Welcome to Groovy! A playlist sharing website that allows you to create your own personal playlists, create songs, connect with friends all jive to fun beats.
        </p>
        <p 
          style={{
            fontSize: '1.2rem',
            transition: 'font-size 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.fontSize = '1.4rem')}
          onMouseOut={(e) => (e.currentTarget.style.fontSize = '1.2rem')}
        >
          What are you waiting for? Login or register below to start the fun!
        </p>
        <div className="auth-forms" style={{ paddingBottom: '2rem' }}>
          <LoginForm />
          <SignUpForm />
        </div>
      </div>
    );
  }
}
