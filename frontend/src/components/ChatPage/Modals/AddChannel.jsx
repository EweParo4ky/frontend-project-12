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
  console.log('channels in add Modal', channelsNames);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: validateChannel(channelsNames),
    onSubmit: async (values) => {
      try {
        await addNewChannel({ name: values.channelName });
        console.log('SUBMIT IN ADDCHANNEL');
        console.log('value in ADDCHANNEL', values);
        dispatch(modalActions.toggleModal());
      } catch (error) {
        console.error(error);
      }
    },
  });

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
                id="channelName"
                onChange={formik.handleChange}
                name="channelName"
                value={formik.values.channelName}
                ref={inputRef}
                isInvalid={
                  formik.touched.channelName && formik.errors.channelName
                }
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
                variant="secondary"
              >
                Отменить
              </Button>
              <button type="submit" className="btn btn-outline-info">
                Отправить
              </button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
