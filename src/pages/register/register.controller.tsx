import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth.service';
import { useToastContext } from '../../context/toast-context';
import RegisterView from './register.view';

export interface RegisterFormErrors {
  username: string;
  email: string;
  password: string;
}

export interface RegisterTouchedFields {
  username: boolean;
  email: boolean;
  password: boolean;
}

const getPasswordStrength = (password: string) => {
  let strength = 0;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];

  strength = checks.filter(Boolean).length;

  if (strength <= 2) return { level: 'Fraca', color: 'bg-red-500', percentage: 33 };
  if (strength <= 3) return { level: 'Média', color: 'bg-yellow-500', percentage: 66 };
  return { level: 'Forte', color: 'bg-green-500', percentage: 100 };
};

const RegisterController = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({ username: '', email: '', password: '' });
  const [touchedFields, setTouchedFields] = useState<RegisterTouchedFields>({ username: false, email: false, password: false });
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email address is invalid.';
    } else if (name === 'password' && value.length < 6) {
      error = 'Password must be at least 6 characters long.';
    }

    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    if (touchedFields[name as keyof RegisterTouchedFields]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateField('username', username);
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (usernameError || emailError || passwordError) {
      return;
    }

    try {
      await registerUser({ username, email, password });
      showToast('Registration successful! Redirecting to login...', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error');
      console.error(err);
    }
  };

  return (
    <RegisterView
      username={username}
      email={email}
      password={password}
      formErrors={formErrors}
      touchedFields={touchedFields}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      getPasswordStrength={getPasswordStrength}
    />
  );
};

export default RegisterController;
