
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

interface PublicLayoutProps {
  navbarVariant?: 'dark' | 'light';
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  navbarVariant = 'dark',
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar variant={navbarVariant} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
