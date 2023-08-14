import {
  React, useRef, useEffect,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { actions as modalActions } from '../../../slices/modalSlice';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
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

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { renameChannel } = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );

  const selectedChannelId = useSelector((state) => state.modal.id);
  const selectedChannel = useSelector(
    (state) => channelsSelectors.selectById(state, selectedChannelId),
  );
  console.log('channel in RENAME', selectedChannel);

  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: selectedChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validateChannel(channelsNames),
    onSubmit: async (values) => {
      const renamedChannel = {
        id: selectedChannel.id,
        name: values.channelName,
        removable: selectedChannel.removable,
      };
      try {
        await renameChannel(renamedChannel);
        formik.resetForm();
        dispatch(modalActions.closeModal());
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                name="channelName"
                id="channelName"
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                isInvalid={formik.errors.channelName}
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">
                Имя канала
              </Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.closeModal())}
                className="me-2"
                variant="secondary"
              >
                Отменить
              </Button>
              <Button
                type="submit"
                onClick={formik.handleSubmit}
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

export default RenameChannel;
