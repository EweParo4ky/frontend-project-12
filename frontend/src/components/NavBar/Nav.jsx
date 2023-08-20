import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from '../../contexts/authContext';
import routes from '../../routes';

const Nav = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const path = auth.userData ? '#' : routes.chatPagePath();

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={path}>
          {t('navBar.header')}
        </a>
        {auth.userData ? (
          <Button onClick={() => auth.logOut()} variant="outline-info">
            {t('navBar.logOutBtn')}
          </Button>
        ) : null}
      </div>
    </Navbar>
  );
};

export default Nav;
