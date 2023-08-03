import { React, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { actions as messagesActions } from '../../../slices/messagesSlice.js';
import { useAuth } from '../../../contexts/authContext.jsx';
import { useSocket } from '../../../contexts/socketContext.jsx';

const MessagesForm = () => {
  const { userData } = useAuth();
  const { username } = userData;
  const inputRef = useRef();
  const selectedChannelId = useSelector((state) => state.selectedChannel.value);
  const store = useSelector((state) => state);
  const { sendNewMessage } = useSocket();
  console.log('////STORE////', store);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (value) => {
      try {
        sendNewMessage(
          messagesActions.addMessage({
            body: value.body,
            channelId: selectedChannelId,
            username,
          }),
        );
        formik.setSubmitting(true);
        formik.resetForm();
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            onChange={formik.handleChange}
            className="border-0 p-0 ps-2"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            id="messageForm"
            type="text"
            name="body"
            ref={inputRef}
            value={formik.values.body}
          />
          <button type="submit" className="btn btn-group-vertical">
            <ArrowRightSquare size={20} />
          </button>
        </Form.Group>
      </fieldset>
    </Form>
  );
};

export default MessagesForm;
