import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../../routes.js';
import { useAuth } from '../contexts/authContext.jsx';

const LoginForm = () => {
  const { logIn } = useAuth();
  const redirect = useNavigate();

  console.log('localstorage', localStorage.getItem('userData'));

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginApiPath(), values);
        console.log('response', response.data);
        logIn(response.data);
        console.log('!!!!!!!!!!!!!', localStorage.getItem('userData'));
        redirect(routes.chatPagePath());
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Ваш ник"
          required
          autoComplete="username"
          id="username"
          type="text"
          name="username"
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Пароль"
          required
          autoComplete="password"
          id="password"
          type="text"
          name="password"
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};
export default LoginForm;
