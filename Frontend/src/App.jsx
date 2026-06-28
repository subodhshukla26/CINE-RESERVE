import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import SelectTheatre from './pages/SelectTheatre';
import SelectSchedulePage from './pages/SelectSchedulePage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import PaymentPage from './pages/PaymentPage';
import MovieDetails from './pages/MovieDetails';
import MyBookingsPage from './pages/MyBookingsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/select-theatre/:slug"
        element={
          <ProtectedRoute>
            <SelectTheatre />
          </ProtectedRoute>
        }
      />
      <Route
        path="/SelectSchedulePage"
        element={
          <ProtectedRoute>
            <SelectSchedulePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/SelectSeatPage"
        element={
          <ProtectedRoute>
            <SeatSelectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/BookingSummaryPage"
        element={
          <ProtectedRoute>
            <BookingSummaryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/PaymentPage"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
