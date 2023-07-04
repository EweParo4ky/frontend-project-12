import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
// import * as yup from 'yup';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: () => console.log('Submit!'),
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
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
