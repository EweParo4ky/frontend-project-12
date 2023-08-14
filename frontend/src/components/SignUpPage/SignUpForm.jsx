import {
  React, useRef, useState, useEffect,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes';
import { useAuth } from '../../contexts/authContext';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Не менее шести символов').required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароль должен совпадать')
    .required('Обязательное поле'),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const inputRef = useRef();
  const [signUpFailed, setSignUpFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const signUpData = values;
      try {
        const response = await axios.post(routes.singupApiPath(), signUpData);
        logIn(response.data);
        navigate(routes.chatPagePath());
      } catch (error) {
        formik.setSubmitting(false);

        if (error.response.status === 409) {
          setSignUpFailed(true);
          console.error(error);
          return;
        }
        throw error;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [signUpFailed]);

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <fieldset>
        <h1 className="text-center mb-4">Регистрация</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            id="username"
            autoComplete="username"
            placeholder="Имя пользователя"
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            required
            isInvalid={
              signUpFailed
              || (formik.touched.username && formik.errors.username)
            }
          />
          <Form.Label htmlFor="username">Имя пользователя</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="password"
            id="password"
            autoComplete="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
            isInvalid={
              signUpFailed
              || (formik.touched.password && formik.errors.password)
            }
          />
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="confirmPassword"
            placeholder="Подтвердите пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            required
            isInvalid={
              signUpFailed
              || (formik.touched.confirmPassword && formik.errors.confirmPassword)
            }
          />
          <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {signUpFailed ? 'Такой пользователь уже существует' : formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-info" className="w-100">
          Зарегестрироваться
        </Button>
      </fieldset>
    </Form>
  );
};

export default SignUpForm;
