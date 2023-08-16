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

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <Authorization>
                <ChatPage />
              </Authorization>
            )}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer />
  </AuthProvider>
);
export default App;
