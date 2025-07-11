import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authService';
import { useToastContext } from '../context/ToastContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { showToast } = useToastContext();

  const validateField = (name: string, value: string) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Email address is invalid.';
    }
    if (name === 'password' && value.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateField('username', username);
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (usernameError || emailError || passwordError) {
      setFormErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleBlur}
            />
            {formErrors.username && <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
            />
            {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
            />
            {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
