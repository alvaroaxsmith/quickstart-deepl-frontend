import React from 'react';
import { Link } from 'react-router-dom';
import { type RegisterFormErrors, type RegisterTouchedFields } from './register.controller';

interface RegisterViewProps {
  username: string;
  email: string;
  password: string;
  formErrors: RegisterFormErrors;
  touchedFields: RegisterTouchedFields;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  getPasswordStrength: (password: string) => { level: string; color: string; percentage: number };
}

const RegisterView: React.FC<RegisterViewProps> = ({
  username,
  email,
  password,
  formErrors,
  handleInputChange,
  handleBlur,
  handleSubmit,
  getPasswordStrength
}) => (
  <div className="flex items-center justify-center bg-gray-900 text-gray-200">
    <div className="w-full max-w-md p-8 space-y-12 bg-gray-800 rounded-lg shadow-lg">
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
            style={{ cursor: 'pointer' }}
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

export default RegisterView;
