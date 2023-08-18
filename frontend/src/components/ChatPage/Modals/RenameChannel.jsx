import {
  React, useRef, useEffect,
} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { actions as modalActions } from '../../../slices/modalSlice';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { useSocket } from '../../../contexts/socketContext';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );

  const selectedChannelId = useSelector((state) => state.modal.id);
  const selectedChannel = useSelector(
    (state) => channelsSelectors.selectById(state, selectedChannelId),
  );

  const validateChannel = () => yup
    .object().shape({
      channelName: yup
        .string()
        .trim()
        .min(3, t('modals.renameChannel.validation.channelNameLen'))
        .max(20, t('modals.renameChannel.validation.channelNameLen'))
        .required(t('modals.renameChannel.validation.required'))
        .notOneOf(channelsNames, t('modals.renameChannel.validation.uniqName')),
    });

  useEffect(() => {
    inputRef.current.focus();
  });
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: selectedChannel.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validateChannel(channelsNames),
    onSubmit: async (values) => {
      const censoredChannelName = filter.clean(values.channelName);
      const renamedChannel = {
        id: selectedChannel.id,
        name: censoredChannelName,
        removable: selectedChannel.removable,
      };
      try {
        await renameChannel(renamedChannel);
        formik.resetForm();
        dispatch(modalActions.closeModal());
        toast.success(t('modals.renameChannel.renamed'));
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                name="channelName"
                id="channelName"
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                isInvalid={formik.errors.channelName}
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">
                {t('modals.renameChannel.lable')}
              </Form.Label>
              <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.closeModal())}
                className="me-2"
                variant="secondary"
              >
                {t('modals.renameChannel.cancelBtn')}
              </Button>
              <Button
                type="submit"
                onClick={formik.handleSubmit}
                variant="outline-info"
              >
                {t('modals.renameChannel.submitBtn')}
              </Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
