import { React } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
import { actions as modalActions } from '../../../slices/modalSlice';

const RenameChannel = () => {
  const dispatch = useDispatch();

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <fieldset>
            <Form.Group>
              <Form.Control
                className="mb-2"
                id="channelName"
              />
              <Form.Label className="visually-hidden" htmlFor="сhannelName">
                Имя канала
              </Form.Label>
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.closeModal())}
                className="me-2"
                variant="secondary"
              >
                Отменить
              </Button>
              <button
                type="submit"
                className="btn btn-outline-info"
              >
                Отправить
              </button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
