import { React, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import { PlusSquare } from 'react-bootstrap-icons';
import {
  actions as channelsActions,
} from '../../../slices/channelsSlice';
import { actions as modalActions } from '../../../slices/modalSlice';
import AddChannel from '../Modals/AddChannel.jsx';
import DeleteChannel from '../Modals/DeleteChannel.jsx';
import RenameChannel from '../Modals/RenameChannel.jsx';

const ChannelsCol = ({ channels, selectedChannelId }) => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.modal);
  const { t } = useTranslation();
  const defaultChannelId = 1;
  const lastChennelId = channels.at(-1)?.id;

  useEffect(() => {
    if (selectedChannelId === defaultChannelId) {
      scroll.scrollToTop({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
    if (selectedChannelId === lastChennelId) {
      scroll.scrollToBottom({ containerId: 'channels-box', delay: 0, duration: 0 });
    }
  }, [selectedChannelId, lastChennelId]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        {modalType === 'addModal' && <AddChannel />}
        <span>
          <b>{t('chatPage.channelsCol.channels')}</b>
        </span>
        <button
          type="button"
          className="p-0 text-info btn btn-group-vertical"
          onClick={() => dispatch(modalActions.openModal({ modalType: 'addModal' }))}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">{t('chatPage.channelsCol.addChannelBtn')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                className="w-100 rounded-0 text-start btn text-truncate"
                onClick={() => {
                  dispatch(channelsActions.setSelectedChannelId(channel.id));
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
                  <span className="visually-hidden">{t('chatPage.channelsCol.control')}</span>
                </Dropdown.Toggle>
              )}
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ modalType: 'deleteModal', channelId: channel.id }))} eventKey="1">{t('chatPage.channelsCol.removeChannelBtn')}</Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(modalActions.openModal({ modalType: 'renameModal', channelId: channel.id }))} eventKey="2">{t('chatPage.channelsCol.renameChannelBtn')}</Dropdown.Item>
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
