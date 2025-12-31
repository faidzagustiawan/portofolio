import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4 text-gray-500">

          <a href="https://github.com/faidzagustiawan" className="hover:text-blue-600 transition-colors"><Github size={20} /></a>
          <a href="https://www.instagram.com/faidzagustiawan" className="hover:text-pink-600 transition-colors"><Instagram size={20} /></a>
          <a href="https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
          <a href="mailto:faidzagustiawan@gmail.com" className="hover:text-red-600 transition-colors"><Mail size={20} /></a>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Faidz Portfolio. Dibuat dengan React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;