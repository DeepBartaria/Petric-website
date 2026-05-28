import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import WhatsAppStickyButton from './components/WhatsAppStickyButton';
import BottomPopup from './components/BottomPopup';
import CategoryPage from './pages/CategoryPage';
import NewHome from './pages/NewHome';
import AllBrands from './pages/AllBrands';
import AllCategories from './pages/AllCategories';
import Reorder from './pages/Reorder';
import ProductDetails from './pages/ProductDetails';
import SavedAddresses from './pages/SavedAddresses';
import Front from './pages/Front';
import Newtemp from './pages/newtemp';
import Hello from './pages/hello';

function App() {
  const location = useLocation();
  const showWhatsApp = location.pathname !== '/hello';
  return (
    <>
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/new-home" element={<NewHome />} />
        <Route path="/all-brands" element={<AllBrands />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/reorder" element={<Reorder />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/front" element={<Front />} />
        <Route path="/front.jsx" element={<Front />} />
        <Route path="/newtemp.jsx" element={<Newtemp />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/*" element={<MainLayout />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/saved-addresses" element={<SavedAddresses />} />
      </Routes>
      {showWhatsApp && <WhatsAppStickyButton />}
    </>
  );
}

export default App;
