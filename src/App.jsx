import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

import NewHome from './pages/NewHome';

function App() {
  return (
    <Routes>
      <Route path="/new-home" element={<NewHome />} />
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;
