import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar(props) {

  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    })
  }

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {props.user ? (
        <>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to='/' onClick={() => handleLogout()}>Logout</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )
      }
    </ul >
  )
}
