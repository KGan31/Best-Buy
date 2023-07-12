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
  return (
    <nav className='flex bg-gray-300 items-center'>
      <div className="flex justify-start items-center">
        <div className='flex'>
          <div className='text-2xl font-bold pr-5 pl-2'>
            <Link to = "/">Best Buy</Link>
          </div>
          <div>
            <input type="text" placeholder='Search' className='items-center mt-1 decoration-none outline-none rounded-md'/>
          </div>
          <div className="items-center mt-1">
            <Link to="/orders" className='ml-3 mr-3'>Your Orders</Link>
            <Link to="/sales" className='ml-3 mr-3'>Your Sales</Link>
            <Link to="/sell" className='ml-3 mr-3'>Sell</Link>
            <Link to="/cart" className='ml-3 mr-3'>Cart</Link>
            <Link to="/checkout" className='ml-3 mr-3'>Checkout</Link>
          </div>
        </div>
        <div className='float-right'>
          <div>
            {user && (
              <div>
                <span className='mr-3'>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div> 
            )}
            {!user && (
              <div>
                <Link to="/login" className='mr-3'>Login</Link>
                <Link to="/signup">Sign up</Link>
            </div>
            )}
          </div>
        </div>
      </div>
      
    </nav>
)}

export default Navbar
