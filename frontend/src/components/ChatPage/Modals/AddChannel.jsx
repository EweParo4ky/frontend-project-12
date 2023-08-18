import { React, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { actions as modalActions } from '../../../slices/modalSlice';
import { useSocket } from '../../../contexts/socketContext';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addNewChannel } = useSocket();
  const channelsNames = useSelector(channelsSelectors.selectAll).map(
    (channel) => channel.name,
  );

  const inputRef = useRef();

  const validateChannel = () => yup
    .object().shape({
      channelName: yup
        .string()
        .trim()
        .min(3, t('modals.addChannel.validation.channelNameLen'))
        .max(20, t('modals.addChannel.validation.channelNameLen'))
        .required(t('modals.addChannel.validation.required'))
        .notOneOf(channelsNames, t('modals.addChannel.validation.uniqName')),
    });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: validateChannel(channelsNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const censoredChannelName = filter.clean(values.channelName);
      try {
        await addNewChannel({ name: censoredChannelName });
        dispatch(modalActions.closeModal());
        formik.setSubmitting(true);
        toast.success(t('modals.addChannel.added'));
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => dispatch(modalActions.closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                name="channelName"
                id="channelName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                ref={inputRef}
                isInvalid={formik.errors.channelName}
              />
              <Form.Label className="visually-hidden" htmlFor="сhannelName">
                {t('modals.addChannel.lable')}
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {formik.errors.channelName ? formik.errors.channelName : null}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => dispatch(modalActions.closeModal())}
                className="me-2"
                variant="outline-secondary"
              >
                {t('modals.addChannel.cancelBtn')}
              </Button>
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                variant="outline-info"
              >
                {t('modals.addChannel.submitBtn')}
              </Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
