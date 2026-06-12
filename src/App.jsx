import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { useEffect } from 'react';
import { trackMetaPageView } from './helper/metaPixel';
import { HelmetProvider } from 'react-helmet-async';
import { initCleverTap, trackCleverTapEvent } from './helper/clevertap';
import LoginPromptModal from './components/LoginPromptModal';

function App() {
  const location = useLocation();

  useEffect(() => {
    initCleverTap();
    if (!sessionStorage.getItem('petric_clevertap_session_started')) {
      trackCleverTapEvent('Session Started', {
        Source: document.referrer ? 'Referral' : 'Direct',
        Referrer: document.referrer || undefined,
        'UTM Source': new URLSearchParams(window.location.search).get('utm_source') || undefined,
        'UTM Medium': new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        'UTM Campaign': new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
      });
      sessionStorage.setItem('petric_clevertap_session_started', 'true');
    }
  }, []);

  useEffect(() => {
    trackMetaPageView();
    trackCleverTapEvent('Page Viewed', {
      'Page Path': location.pathname,
      'Page Search': location.search || undefined,
      'Page URL': window.location.href,
      Referrer: document.referrer || undefined,
    });
  }, [location.pathname, location.search]);

  const showWhatsApp = location.pathname !== '/inminutesdelivery';

  return (
    <>
      <HelmetProvider>
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
          <Route path="/inminutesdelivery" element={<Hello />} />
          <Route path="/*" element={<MainLayout />} />
          <Route path="/category/:identifier" element={<CategoryPage />} />
          <Route path="/saved-addresses" element={<SavedAddresses />} />
          <Route path="/hello" element={<Navigate to="/inminutesdelivery" replace />} />
          <Route path="/brand/:brandSlug" element={<AllCategories />} />
        </Routes>
      </HelmetProvider>
      {showWhatsApp && <WhatsAppStickyButton />}
      <LoginPromptModal />
    </>
  );
}

export default App;
