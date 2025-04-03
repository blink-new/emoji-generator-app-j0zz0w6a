
import { Link, useLocation } from 'react-router-dom'

export function Nav() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
          >
            Emoji Generator
          </Link>
          
          {!isLoginPage && (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}