import React from 'react';
import Image from 'react-bootstrap/Image';
import notFound from '../../assets/404.svg';

const NotFoundPage = () => (
  <div className="text-center">
    <Image
      alt="Страница не найдена"
      className="img-fluid h-25"
      src={notFound}
    />
    <h1 className="h4 text-muted">Not Found 404</h1>
  </div>
);

export default NotFoundPage;
