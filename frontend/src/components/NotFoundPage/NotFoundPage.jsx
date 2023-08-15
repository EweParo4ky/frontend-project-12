import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'react-bootstrap/Image';
import notFound from '../../assets/404.svg';
import Nav from '../NavBar/Nav';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Nav />
      <div className="text-center">
        <Image
          alt={t('notFoundPage.notFound')}
          className="img-fluid h-25"
          src={notFound}
        />
        <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
        <p className="text-muted">
          {t('notFoundPage.redirect')}
          {' '}
          <a href="/">{t('notFoundPage.mainPage')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
