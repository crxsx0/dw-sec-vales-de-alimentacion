import React from 'react'; // Agrega esta línea
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/navbar/navbar';
import MainLayout from './components/mainLayout/mainlayout';
import Footer from './components/footer/footer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <MainLayout />
    <Footer />
  </StrictMode>
);