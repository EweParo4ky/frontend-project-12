import React from 'react';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

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

export default MessageForm;
