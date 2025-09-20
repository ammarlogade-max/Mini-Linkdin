import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import HomePage from '../pages/HomePage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import VerifyEmailPage from '../pages/VerifyEmailPage'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/" />}
      />
      <Route
        path="/reset-password"
        element={!isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/" />}
      />
      <Route
        path="/verify-email"
        element={!isAuthenticated ? <VerifyEmailPage /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default AppRoutes