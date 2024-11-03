import React from 'react';

export class Song extends React.Component
{
  render() 
  {
    const { title, artist, duration } = this.props;  

    return (
      <div className="song">
        <h3 style={{ fontWeight: 'bold' }}>{title}</h3>
        <p style={{ display: 'inline' }}>{artist}</p>
        <p style={{ display: 'inline', marginLeft: '10px' }}>({duration})</p>
      </div>
    );
  }
}
