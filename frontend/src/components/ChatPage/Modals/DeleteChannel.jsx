import { React, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../../slices/modalSlice';
import { setSelectedChannelId } from '../../../slices/selectedChannelSlice';
import { useSocket } from '../../../contexts/socketContext';

const DeleteChannel = () => {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const { deleteChannel } = useSocket();
  const channelId = useSelector((state) => state.modal.id);
  const defaultChannelId = 1;

  const handleDeleteChannel = async () => {
    try {
      await deleteChannel({ id: channelId });
      dispatch(modalActions.closeModal());
      setIsDeleted(true);
      dispatch(setSelectedChannelId(defaultChannelId));
    } catch (error) {
      console.error(error);
      setIsDeleted(false);
    }
  };

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
            variant="outline-secondary"
            disabled={isDeleted}
          >
            Отменить
          </Button>
          <Button
            onClick={handleDeleteChannel}
            variant="outline-warning"
            disabled={isDeleted}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
