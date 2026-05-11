import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import WhatsAppStickyButton from './components/WhatsAppStickyButton';
import BottomPopup from './components/BottomPopup';

import NewHome from './pages/NewHome';
import AllBrands from './pages/AllBrands';
import AllCategories from './pages/AllCategories';
import Reorder from './pages/Reorder';
import Sample from './pages/Sample';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/new-home" element={<NewHome />} />
        <Route path="/all-brands" element={<AllBrands />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/reorder" element={<Reorder />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
      <WhatsAppStickyButton />
    </>
  );
}

export default App;
