import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AppRouter } from '@/routes/AppRouter';

export const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  return <AppRouter />;
};

export default App;
