import { React, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  actions as messagesActions,
  selectors as messageSelectors,
} from '../../../slices/messagesSlice.js';
import { useAuth } from '../../../contexts/authContext.jsx';
import { useSocket } from '../../../contexts/socketContext.jsx';

const MessagesForm = () => {
  const { userData } = useAuth();
  const { username } = userData;
  const inputRef = useRef();
  const { t } = useTranslation();
  const selectedChannelId = useSelector((state) => state.selectedChannel.value);
  const messages = useSelector(messageSelectors.selectAll);
  const lastMessage = messages.at(-1);
  const { sendNewMessage } = useSocket();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const trimedMessage = values.body.trim();
      const censoredMessage = filter.clean(trimedMessage);
      try {
        if (trimedMessage.length !== 0) {
          await sendNewMessage(
            messagesActions.addMessage({
              body: censoredMessage,
              channelId: selectedChannelId,
              username,
            }),
          );
          formik.resetForm();
        }
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });
  const isSubmitDisable = formik.isSubmitting || formik.values.body.trim() === '';

  useEffect(() => {
    inputRef.current.focus();
  }, [selectedChannelId, lastMessage]);

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
            onBlur={formik.handleBlur}
            className="border-0 p-0 ps-2"
            placeholder={t('chatPage.messageForm.inputField')}
            aria-label={t('chatPage.messageForm.lable')}
            id="messageForm"
            type="text"
            name="body"
            ref={inputRef}
            value={formik.values.body}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={isSubmitDisable}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">
              {t('chatPage.messageForm.submitBtn')}
            </span>
          </button>
        </Form.Group>
      </fieldset>
    </Form>
  );
};

export default MessagesForm;
