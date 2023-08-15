import { React, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { actions as modalActions } from '../../../slices/modalSlice';
import { useSocket } from '../../../contexts/socketContext';

const validateChannel = (channelsNames) => yup
  .object().shape({
    channelName: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelsNames, 'Имя канала должно быть уникальным'),
  });

const AddChannel = () => {
  const dispatch = useDispatch();
  const { addNewChannel } = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );

  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: validateChannel(channelsNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await addNewChannel({ name: values.channelName });
        dispatch(modalActions.closeModal());
        formik.setSubmitting(true);
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                name="channelName"
                id="channelName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                ref={inputRef}
                isInvalid={formik.errors.channelName}
              />
              <Form.Label className="visually-hidden" htmlFor="сhannelName">
                Имя канала
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.channelName ? formik.errors.channelName : null}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.closeModal())}
                className="me-2"
                variant="outline-secondary"
              >
                Отменить
              </Button>
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                variant="outline-info"
              >
                Отправить
              </Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
