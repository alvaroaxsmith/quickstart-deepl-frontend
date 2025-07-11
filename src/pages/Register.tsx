import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authService';
import { useToastContext } from '../context/ToastContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ username: '', email: '', password: '' });
  const [touchedFields, setTouchedFields] = useState({ username: false, email: false, password: false });
  const navigate = useNavigate();
  const { showToast } = useToastContext();

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

    // Validate in real-time only if the field has been touched
    if (touchedFields[name as keyof typeof touchedFields]) {
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
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-label="Username"
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
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-label="Email address"
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
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-label="Password"
            />
            {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Força da senha:</span>
                  <span className={`text-sm font-medium ${getPasswordStrength(password).level === 'Fraca' ? 'text-red-500' :
                      getPasswordStrength(password).level === 'Média' ? 'text-yellow-500' :
                        'text-green-500'
                    }`}>
                    {getPasswordStrength(password).level}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(password).color}`}
                    style={{ width: `${getPasswordStrength(password).percentage}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  <ul className="list-disc list-inside space-y-1">
                    <li className={password.length >= 8 ? 'text-green-400' : 'text-gray-400'}>
                      Pelo menos 8 caracteres
                    </li>
                    <li className={/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-400'}>
                      Letras minúsculas
                    </li>
                    <li className={/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-400'}>
                      Letras maiúsculas
                    </li>
                    <li className={/[0-9]/.test(password) ? 'text-green-400' : 'text-gray-400'}>
                      Números
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : 'text-gray-400'}>
                      Caracteres especiais
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all duration-300"
              aria-label="Submit registration form"
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
