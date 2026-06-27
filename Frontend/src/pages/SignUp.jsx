import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../components/auth/AuthLayout';
import AuthTabs from '../components/auth/AuthTabs';
import AuthInput from '../components/auth/AuthInput';
import PrimaryButton from '../components/common/PrimaryButton';
import toast from 'react-hot-toast';
import { setLoading } from '../redux/authSlice';
import { signupUser } from '../services/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required';
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const nextErrors = validateForm();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    dispatch(setLoading(true));

    try {
      await signupUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Registration succeeded — do not auto-login. Prompt user to sign in.
      toast.success('Registration successful! Please log in to continue.');
      navigate('/login', { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to sign up right now';

      setSubmitError(message);
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthLayout>
      <AuthTabs activeTab="signup" />
      
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange('fullName')}
          error={errors.fullName}
        />
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
        <AuthInput
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <div className="mt-8">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </PrimaryButton>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
