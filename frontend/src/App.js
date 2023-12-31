import {Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sell from './pages/Sell'
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sales from './pages/Sales'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import SoldItemDetails from './pages/SoldItemDetails'

function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path='/'
              element={user ? <Home />: <Navigate to="/login"/>}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate to="/"/> }
            />
            <Route 
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
            <Route
              path='/sell'
              element = {user ? <Sell/>: <Navigate to="/login"/>} 
            />
            <Route 
              path="/sales"
              element = {user ? <Sales />: <Navigate to="/login"/>}
            />
            <Route 
              path="/items/:id"
              element = {user ? <ItemDetails />: <Navigate to="/login"/>}
            />
            <Route 
              path="/items/sold/:id"
              element = {user ? <SoldItemDetails />: <Navigate to="/login"/>}
            />
            <Route 
              path="/orders"
              element = {user ? <Orders />: <Navigate to="/login"/>}
            />
            <Route 
              path="/cart"
              element = {user ? <Cart />: <Navigate to="/login"/>}
            />
            <Route 
              path="/checkout"
              element = {user ? <Checkout />: <Navigate to="/login"/>}
            />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
