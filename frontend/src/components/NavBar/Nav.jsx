import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';

const Nav = () => {
  const auth = useAuth();
  console.log('auth', auth);
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {auth.userData ? (
          <Button onClick={() => auth.logOut()} variant="outline-info">
            Выйти
          </Button>
        ) : null}
      </div>
    </Navbar>
  );
};

export default Nav;
