import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import HealthCare from '../pages/HealthCare'
import PetsProducts from '../pages/PetsProduct';
import Grooming from '../pages/Grooming';
import AboutUs from '../pages/AboutUs';
import RegisterAsPartner from '../pages/RegisterAsPartner';
import FAQs from '../pages/FAQ';
import News from '../pages/News';
import ArticleDetail from '../pages/ArticleDetail';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import ContactDetails from '../pages/ContactDetails';
import Download from "../pages/Download";
import Partners from "../pages/Partners";
import Story from "../pages/Story";

import RefundCancellation from '../pages/RefundCancellation';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/download" element={<Download />} />
      <Route path="/healthcare" element={<HealthCare />} />
      <Route path="/products" element={<PetsProducts />} />
      <Route path="/grooming" element={<Grooming />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/story" element={<Story />} />
      <Route path="/register" element={<RegisterAsPartner />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<ArticleDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/contactus" element={<ContactDetails />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/refund-cancellation" element={<RefundCancellation />} />
      {/* Add other routes here, e.g. HealthCare, Products, Grooming, About, Register */}
    </Routes>
  );
} 