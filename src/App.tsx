import { Route, Routes } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Translate from './pages/Translate';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <ToastProvider>
      <div className="bg-gray-900 min-h-screen text-gray-200">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/translate" element={<ProtectedRoute><Translate /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Translate /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  )
}

export default App
