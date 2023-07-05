import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatPage from './ChatPage/ChatPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import SignupPage from './SignupPage/SignupPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
