import { React } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../NavBar/Nav';
import LoginForm from './LoginForm';
import loginImage from '../../assets/loginImage.jpg';
import routes from '../../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Nav />
      <Container fluid className="h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    style={{ widht: '200px', height: '200px', marginTop: '70px' }}
                    src={loginImage}
                    className="rounded-circle"
                    alt={t('logInPage.logIn')}
                  />
                </div>
                <LoginForm />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('logInPage.noAcc')}
                    {' '}
                  </span>
                  <Link to={routes.signupPagePath()}>{t('logInPage.regestration')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default LoginPage;
