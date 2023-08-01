import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const handleClick = () =>{
    logout();
  }
return(
  <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo or Title */}
              <Link to="/" className="text-white text-lg font-semibold">Best Buy</Link>
            </div>
            {user &&
              <div className="hidden space-x-8  items-center sm:-my-px sm:ml-10 sm:flex">
                {/* Navbar Links */}
                <Link to="/orders" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Orders</Link>
                <Link to="/sales" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sales</Link>
                <Link to="/sell" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sell</Link>
                <Link to="/cart" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cart</Link>
                <Link to="/checkout" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Checkout</Link>
              </div>
            }
          </div>
          <div className=" hidden sm:flex sm:items-center sm:ml-6">
            {user && (
              <div>
              <span className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">{user.email}</span>
              <button onClick={handleClick} className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 border border-red-600 rounded shadow">Log out</button>
              </div>
            )}
            {!user && (
              <div>
                {/* Login and Logout Buttons */}
                <Link to = "/login" className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow mx-1">
                  Login
                </Link>
                <Link to = "/signup" className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow mx-1">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
)}



export default Navbar
