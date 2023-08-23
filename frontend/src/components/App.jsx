import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './ChatPage/ChatPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import SignUpPage from './SignUpPage/SignUpPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import { AuthProvider } from '../contexts/authContext.jsx';
import Authorization from './AuthorizationCheck/AuthorizationCheck.jsx';
import routes from '../routes.js';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route
          path={routes.chatPagePath()}
          element={(
            <Authorization>
              <ChatPage />
            </Authorization>
            )}
        />
        <Route path={routes.signupPagePath()} element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);
export default App;
