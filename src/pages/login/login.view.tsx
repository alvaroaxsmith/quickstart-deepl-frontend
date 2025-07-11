import React from 'react';
import { Link } from 'react-router-dom';
import { type LoginFormErrors, type TouchedFields } from './login.controller';

interface LoginViewProps {
  email: string;
  password: string;
  formErrors: LoginFormErrors;
  touchedFields: TouchedFields;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  email,
  password,
  formErrors,
  handleInputChange,
  handleBlur,
  handleSubmit
}) => (
  <div className="flex items-center justify-center bg-gray-900 text-gray-200">
    <div className="w-full max-w-md p-8 space-y-12 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center">Login</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label="Password"
          />
          {formErrors.password && <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all duration-300"
            aria-label="Submit login form"
            style={{ cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
        <div className="text-sm text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);

export default LoginView;
