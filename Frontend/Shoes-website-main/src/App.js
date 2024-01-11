import './App.css';
import HomePage from './components/Pages/homepage';
import AboutUs from './components/Pages/aboutus';
import ProductPage from './components/Pages/product';
import ContactUs from './components/Pages/contact';
import Blog from './components/Pages/blog';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Shoes-website" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
