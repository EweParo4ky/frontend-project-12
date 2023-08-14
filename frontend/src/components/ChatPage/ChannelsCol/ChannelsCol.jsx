import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { setSelectedChannelId } from '../../../slices/selectedChannelSlice.js';
import { actions as modalActions } from '../../../slices/modalSlice';
import AddChannel from '../Modals/AddChannel.jsx';
import DeleteChannel from '../Modals/DeleteChannel.jsx';
import RenameChannel from '../Modals/RenameChannel.jsx';

const ChannelsCol = ({ channels, selectedChannelId }) => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.modal);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        {modalType === 'addModal' && <AddChannel />}
        <span>
          <b>Каналы</b>
        </span>
        <button
          type="button"
          className="p-0 text-info btn btn-group-vertical"
          onClick={() => dispatch(modalActions.openModal({ modalType: 'addModal' }))}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                className="w-100 rounded-0 text-start btn text-truncate"
                onClick={() => {
                  dispatch(setSelectedChannelId(channel.id));
                }}
                variant={channel.id === selectedChannelId && 'secondary'}
              >
                <span className="me-1">#</span>
                <span>{channel.name}</span>
              </Button>
              {channel.removable && (
                <Dropdown.Toggle
                  split
                  variant={channel.id === selectedChannelId && 'secondary'}
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
              )}
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ modalType: 'deleteModal', channelId: channel.id }))} eventKey="1">Удалить</Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ modalType: 'renameModal', channelId: channel.id }))} eventKey="2">Переименовать</Dropdown.Item>
                {modalType === 'deleteModal' && <DeleteChannel />}
                {modalType === 'renameModal' && <RenameChannel />}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsCol;
