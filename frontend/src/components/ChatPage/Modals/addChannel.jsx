import { React, useEffect, useREf } from 'react';
import {
  Button, Form, Modal, ModalBody,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { actions as modalActions } from '../../../slices/modalSlice';

const AddChannel = () => {
  const dispatch = useDispatch();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );
  console.log('channels in add Modal', channelsNames);

  const channelsValidationSchema = yup.object().shape({
    channelName: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(),
  });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: { channelsValidationSchema },
    onSubmit: console.log('SUBMIT IN ADDCHANNEL'),
  });

  return (
    <Modal centered show onHide={() => dispatch(modalActions.toggleModal())}>
      <Modal.Header closeButton>Добавить Канал</Modal.Header>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset>
            <Form.Group>
              <Form.Control />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.toggleModal())}
                className="me-2"
                variant="secondary"
              >
                Отменить
              </Button>
              <Button>Отправить</Button>
            </div>
          </fieldset>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddChannel;
