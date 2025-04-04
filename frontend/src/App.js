import Bookshelf from './components/Bookshelf';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Wishlist from './components/Wishlist';

function App() {
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
              path="/wishlist"
              element={<Wishlist />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
