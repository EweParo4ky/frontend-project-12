import React from 'react';
import Image from 'react-bootstrap/Image';
import notFound from '../../assets/404.svg';
import Nav from '../NavBar/Nav';

const NotFoundPage = () => (
  <div className="d-flex flex-column h-100">
    <Nav />
    <div className="text-center">
      <Image
        alt="Страница не найдена"
        className="img-fluid h-25"
        src={notFound}
      />
      <h1 className="h4 text-muted">Not Found 404</h1>
      <p className="text-muted">
        Но вы можете перейти
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </div>
);

export default NotFoundPage;
