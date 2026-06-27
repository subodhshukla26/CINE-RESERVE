import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import AuthLayout from '../components/auth/AuthLayout';
import AuthTabs from '../components/auth/AuthTabs';
import AuthInput from '../components/auth/AuthInput';
import PrimaryButton from '../components/common/PrimaryButton';
import { loginSuccess, setLoading } from '../redux/authSlice';
import { loginUser } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const result = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const user = result.user || { email: formData.email.trim().toLowerCase() };
      const token = result.token;

      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
      dispatch(loginSuccess({ token, user }));
      toast.success('Login successful.');
      navigate('/home', { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to login. Please try again.';
      setSubmitError(message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthLayout>
      <AuthTabs activeTab="login" />
      
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
        <AuthInput
          label="Email ID"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
        />
        <AuthInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <div className="mt-12">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
