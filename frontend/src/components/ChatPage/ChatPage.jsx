import React, { useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, selectors } from '../../slices/channelsSlice.js';
import { setSelectedChannelId } from '../../slices/selectedChannelSlice.js';
import {
  actions as messagesActions,
  selectors as messageSelectors,
} from '../../slices/messagesSlice.js';
import { useAuth } from '../contexts/authContext.jsx';
import routes from '../../routes.js';

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
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-info btn btn-group-vertical">
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

const MessageForm = () => (
  <Form
    noValidate
    className="py-1 border rounded-2"
    onSubmit={(e) => e.preventDefault()}
  >
    <Form.Group className="input-group has-validation">
      <Form.Control
        className="border-0 p-0 ps-2"
        placeholder="Введите сообщение..."
        aria-label="Новое сообщение"
        id="messageForm"
        type="text"
        name="body"
      />
      <button type="submit" className="btn btn-group-vertical">
        <ArrowRightSquare size={20} />
      </button>
    </Form.Group>
  </Form>
);

// ToDO Закончить форму(сабмит + Formik)

const MessageCol = ({ auth, currentChannel }) => (
  <div className="d-flex flex-column h-100">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{currentChannel && `# ${currentChannel.name}`}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
    <div id="messages-box" className="chat-messages overflow-auto px-5 " />
    <div className="mt-auto px-5 py-3">
      {/* ToDO  Добавть MessageBox */}
      <MessageForm />
      <button
        type="button"
        className="mt-3 btn btn-outline-info"
        onClick={() => auth.logOut()}
      >
        Выйти
      </button>
    </div>
  </div>
);

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { token } = auth.userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataApiPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(setChannels(res.data.channels));
        dispatch(setChannels(res.data.channels));
        dispatch(setSelectedChannelId(res.data.currentChannelId));
        dispatch(messagesActions.setMessages(res.data.messages));
        console.log('responseFetchData!!!', res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, token]);

  const channels = useSelector(selectors.selectAll);
  console.log('channels!!!!', channels);
  const selectedChannelId = useSelector((state) => state.selectedChannel.value);
  console.log('selectedChannelId', selectedChannelId);
  const currentChannel = useSelector((state) => selectors.selectById(state, selectedChannelId));
  console.log('currentChannel', currentChannel);
  const selectedChannelMessages = useSelector(messageSelectors.selectAll);
  console.log('messages', selectedChannelMessages);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        {/* Nav */}
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsCol
              channels={channels}
              selectedChannelId={selectedChannelId}
            />
            <div className="col p-0 h-100">
              <MessageCol auth={auth} currentChannel={currentChannel} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default ChatPage;
