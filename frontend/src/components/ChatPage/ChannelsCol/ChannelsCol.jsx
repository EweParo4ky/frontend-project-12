import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { setSelectedChannelId } from '../../../slices/selectedChannelSlice.js';
import { actions as modalActions } from '../../../slices/modalSlice';
import AddChannel from '../Modals/addChannel.jsx';

const handleChannelClasses = (cannelId, selectedChannelId) => {
  const className = 'w-100 rounded-0 text-start btn';
  const selected = 'btn-secondary';
  if (cannelId === selectedChannelId) {
    return `${className} ${selected}`;
  }
  return className;
};

const ChannelsCol = ({ channels, selectedChannelId }) => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.modal);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        {isOpened === true && <AddChannel />}
        <span>
          <b>Каналы</b>
        </span>
        <button
          type="button"
          className="p-0 text-info btn btn-group-vertical"
          onClick={() => dispatch(modalActions.toggleModal())}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <button
              onClick={() => {
                dispatch(setSelectedChannelId(channel.id));
              }}
              type="button"
              className={handleChannelClasses(channel.id, selectedChannelId)}
            >
              <span className="me-1">#</span>
              <span>{channel.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsCol;
