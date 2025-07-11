import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';
import { useAuth } from '../../context/auth-context';
import { useToastContext } from '../../context/toast-context';
import LoginView from './login.view';

export interface LoginFormErrors {
  email: string;
  password: string;
}

export interface TouchedFields {
  email: boolean;
  password: boolean;
}

const LoginController = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({ email: '', password: '' });
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({ email: false, password: false });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, e.target.value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email address is invalid.';
    }

    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    if (touchedFields[name as keyof TouchedFields]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (emailError || passwordError) {
      return;
    }

    try {
      const { data } = await loginUser({ email, password });
      setToken(data.token);
      showToast('Login successful!', 'success');
      navigate('/translate');
    } catch (error) {
      showToast('Login failed. Please check your credentials.', 'error');
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      formErrors={formErrors}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      touchedFields={touchedFields}
    />
  );
};

export default LoginController;
