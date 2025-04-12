import Bookshelf from './pages/Bookshelf';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Wishlist from './pages/Wishlist';
import AddBookForm from './pages/AddBookForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';


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
              element={<Bookshelf />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/wishlist"
              element={<Wishlist />}
            />
            <Route
              path="/addBook"
              element={<AddBookForm />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
