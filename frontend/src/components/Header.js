import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component 
{
  render() 
  {
    return (
      <nav>
        <ul className="flex justify-evenly space-x-12">
          <li>
            <Link 
              to="/"
              className="text-pink-500 font-semibold text-lg hover:text-purple-500 transition-all duration-300 ease-in-out relative"
            >
              Logout
              <span className="absolute left-0 w-0 h-[2px] bg-pink-500 hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/home"
              className="text-blue-400 font-semibold text-lg hover:text-purple-500 transition-all duration-300 ease-in-out relative"
            >
              Home
              <span className="absolute left-0 w-0 h-[2px] bg-blue-400 hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile"
              className="text-purple-400 font-semibold text-lg hover:text-pink-500 transition-all duration-300 ease-in-out relative"
            >
              Profile
              <span className="absolute left-0 w-0 h-[2px] bg-purple-400 hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/playlist"
              className="text-blue-400 font-semibold text-lg hover:text-pink-500 transition-all duration-300 ease-in-out relative"
            >
              Playlist
              <span className="absolute left-0 w-0 h-[2px] bg-blue-400 hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
