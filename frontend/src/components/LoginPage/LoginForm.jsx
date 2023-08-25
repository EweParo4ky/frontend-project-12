import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import routes from '../../routes.js';
import { useAuth } from '../../contexts/authContext.jsx';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const redirect = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const logInData = values;
      try {
        const response = await axios.post(routes.loginApiPath(), logInData);
        logIn(response.data);
        redirect(routes.chatPagePath());
      } catch (error) {
        if (error.message === 'Network Error') {
          toast.error(t('errors.networkError'));
          return;
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('logInPage.header')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={inputRef}
          placeholder={t('logInPage.username')}
          required
          autoComplete="username"
          id="username"
          type="text"
          name="username"
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">{t('logInPage.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('logInPage.password')}
          required
          autoComplete="password"
          id="password"
          type="text"
          name="password"
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">{t('logInPage.password')}</Form.Label>
        {authFailed && (
          <Form.Control.Feedback type="invalid" tooltip>
            {t('logInPage.authFailed')}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" className="w-100 mb-3" variant="outline-info">
        {t('logInPage.logIn')}
      </Button>
    </Form>
  );
};
export default LoginForm;
