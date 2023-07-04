import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage/ChatPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/" element={<ChatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
