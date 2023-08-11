import { React } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions as modalActions } from '../../../slices/modalSlice';

const DeleteChannel = () => {
  const dispatch = useDispatch();

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => dispatch(modalActions.closeModal())}
            className="me-2"
            variant="secondary"
          >
            Отменить
          </Button>
          <button type="submit" className="btn btn-outline-warning">
            Удалить
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
