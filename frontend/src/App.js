import Bookshelf from './pages/Bookshelf';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Wishlist from './pages/Wishlist';
import AddBookForm from './pages/AddBookForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Audiobooks from './pages/Audiobooks';


function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={user ? <Bookshelf /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/wishlist"
              element={user ? <Wishlist /> : <Navigate to="/login" />}
            />
            <Route
              path="/audiobooks"
              element={user ? <Audiobooks /> : <Navigate to="/login" />}
            />
            <Route
              path="/addBook"
              element={user ? <AddBookForm /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
