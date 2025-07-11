import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const Navbar = () => {
  const { isAuthenticated, setToken } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const getActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? { color: '#3B82F6', fontWeight: '600' } : {};

  const linkClasses = "text-gray-200 hover:text-blue-400 transition-colors duration-300";
  const mobileLinkClasses = "block py-2 px-4 text-sm text-gray-200 hover:bg-gray-700";

  return (
    <nav className="sticky top-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/translate" className="text-xl font-bold text-white" aria-label="DeepL Clone - Go to translate page">
              DeepL Clone
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/translate"
                    className={linkClasses}
                    style={getActiveStyle}
                    aria-label="Go to translate page"
                  >
                    Translate
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={linkClasses}
                    style={getActiveStyle}
                    aria-label="Go to history page"
                  >
                    History
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-200 hover:text-blue-400 transition-colors duration-300"
                aria-label="Logout from account"
              >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H4a1 1 0 00-1-1z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L12.586 12H7a1 1 0 110-2h5.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && (
              <>
                <NavLink
                  to="/translate"
                  className={mobileLinkClasses}
                  style={getActiveStyle}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Go to translate page"
                >
                  Translate
                </NavLink>
                <NavLink
                  to="/history"
                  className={mobileLinkClasses}
                  style={getActiveStyle}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Go to history page"
                >
                  History
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center space-x-2 block py-2 px-4 text-sm text-gray-200 hover:bg-gray-700"
                  aria-label="Logout from account"
                >
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V5h10a1 1 0 100-2H4a1 1 0 00-1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L12.586 12H7a1 1 0 110-2h5.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
