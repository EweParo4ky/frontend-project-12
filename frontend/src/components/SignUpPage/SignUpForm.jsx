import {
  React, useRef, useState, useEffect,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../../routes';
import { useAuth } from '../../contexts/authContext';

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const inputRef = useRef();
  const [signUpFailed, setSignUpFailed] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('signUpPage.validation.usernameLen'))
      .max(20, t('signUpPage.validation.usernameLen'))
      .required(t('signUpPage.validation.required')),
    password: yup
      .string()
      .min(6, t('signUpPage.validation.passwordLen')).required(t('signUpPage.validation.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('signUpPage.validation.confirmPassword'))
      .required(t('signUpPage.validation.required')),
  });

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
        <h1 className="text-center mb-4">{t('signUpPage.header')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            id="username"
            type="text"
            autoComplete="username"
            placeholder={t('signUpPage.username')}
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
          <Form.Label htmlFor="username">{t('signUpPage.username')}</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="password"
            id="password"
            type="password"
            autoComplete="password"
            placeholder={t('signUpPage.password')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
            isInvalid={
              signUpFailed
              || (formik.touched.password && formik.errors.password)
            }
          />
          <Form.Label htmlFor="password">{t('signUpPage.password')}</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            placeholder={t('signUpPage.confirmPassword')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            required
            isInvalid={
              signUpFailed
              || (formik.touched.confirmPassword && formik.errors.confirmPassword)
            }
          />
          <Form.Label htmlFor="confirmPassword">{t('signUpPage.confirmPassword')}</Form.Label>
          <Form.Control.Feedback tooltip type="invalid">
            {signUpFailed ? t('signUpPage.signUpFailed') : formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-info" className="w-100">
          {t('signUpPage.signUpBtn')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default SignUpForm;
