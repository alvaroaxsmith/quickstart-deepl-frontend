import { Route, Routes } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import LoginController from './pages/login/login.controller';
import RegisterController from './pages/register/register.controller';
import TranslateController from './pages/translate/translate.controller';
import HistoryController from './pages/history/history.controller';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <ToastProvider>
      <div className="bg-gray-900 min-h-screen text-gray-200">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<LoginController />} />
            <Route path="/register" element={<RegisterController />} />
            <Route path="/translate" element={<ProtectedRoute><TranslateController /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryController /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><TranslateController /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  )
}

export default App
