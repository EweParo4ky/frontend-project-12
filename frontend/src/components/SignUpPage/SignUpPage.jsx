import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import avatarReg from '../../assets/avatarReg.jpg';
import Nav from '../NavBar/Nav';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
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
                    src={avatarReg}
                    className="rounded-circle"
                    alt={t('signUpPage.header')}
                  />
                </div>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
