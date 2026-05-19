import { Outlet } from 'react-router-dom';
// import Header from './Header';
import Navbar from './Navbar';
import AppRoutes from '../routes/Routes';
import WhatsappStickyButton from './WhatsAppStickyButton';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      {/* <Navbar />
      <div className="h-24 sm:h-28 bg-white w-full"></div> */}

      <main className="flex-1">
        <AppRoutes />
      </main>
      <WhatsappStickyButton />
    </div>
  );
} 