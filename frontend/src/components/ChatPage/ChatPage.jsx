import React, { useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, selectors } from '../../slices/channelsSlice.js';
import { useAuth } from '../contexts/authContext.jsx';
import routes from '../../routes.js';

const ChennalsCol = () => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>Каналы</b>
    <Button type="button" className="p-0 btn-group-vertical outline-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="20"
        height="20"
        fill="currentColor"
      >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
      <span className="visually-hidden">+</span>
    </Button>
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
        console.log('response', res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch, token]);

  const channels = useSelector(selectors.selectAll);
  console.log('channels!!!!', channels);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        {/* Nav */}
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <ChennalsCol />
              {/* channelsList (UL) */}
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b># general</b>
                  </p>
                  <span className="text-muted">0 сообщений</span>
                </div>
                <div
                  id="messages-box"
                  className="chat-messages overflow-auto px-5 "
                />
                <div className="mt-auto px-5 py-3">
                  {/* <Form novalidate className="py-1 border rounded-2"></Form> */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => auth.logOut()}
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default ChatPage;
