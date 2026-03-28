import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">Circular Funds</h3>
            <p className="text-gray-400 leading-relaxed">
              Empowering individuals through secure peer-to-peer lending. 
              Borrow smart, lend safe, and grow your wealth together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link></li>
              <li><Link to="/calculator" className="hover:text-[#D4AF37] transition-colors">Interest Calculator</Link></li>
              <li><Link to="/premium" className="hover:text-[#D4AF37] transition-colors">Premium Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/support" className="hover:text-[#D4AF37] transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-[#D4AF37] transition-colors">FAQs</Link></li>
              <li><Link to="/support" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#D4AF37] shrink-0" />
                <span>123 Finance Plaza, Wall Street, NY 10005</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-[#D4AF37] shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-[#D4AF37] shrink-0" />
                <span>support@circularfunds.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Circular Funds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
