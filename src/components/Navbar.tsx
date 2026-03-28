import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { 
  Menu, X, User, LogOut, Calculator, Info, 
  HelpCircle, History, Briefcase, Crown, Home,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(db, 'users', authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data() as UserProfile);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Calculator', path: '/calculator', icon: Calculator },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Support', path: '/support', icon: HelpCircle },
  ];

  const authLinks = user ? [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Borrowing History', path: '/borrowing-history', icon: History },
    { name: 'Lending History', path: '/lending-history', icon: History },
    ...(user.role === 'lender' || user.role === 'both' ? [{ name: 'Lender Dashboard', path: '/lender-dashboard', icon: LayoutDashboard }] : []),
  ] : [];

  return (
    <nav className="bg-[#0A1628] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-[#D4AF37]">Circular Funds</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-[#D4AF37] transition-colors flex items-center space-x-1">
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
            
            {user && (
              <Link to="/premium" className="flex items-center space-x-1 text-[#D4AF37] hover:brightness-110">
                <Crown size={18} />
                <span className="font-semibold">Premium</span>
              </Link>
            )}

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-[#1a2a44] px-3 py-1.5 rounded-full hover:bg-[#2a3a54] transition-colors">
                  <User size={18} />
                  <span>{user.fullName.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-[#0A1628] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  {authLinks.map((link) => (
                    <Link key={link.name} to={link.path} className="block px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                      <link.icon size={16} />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center space-x-2 border-t">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-[#D4AF37] text-[#0A1628] px-6 py-2 rounded-md font-semibold hover:bg-[#C49F27] transition-all">
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#D4AF37]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628] border-t border-gray-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-[#1a2a44] flex items-center space-x-2">
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              ))}
              {user && (
                <>
                  {authLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md hover:bg-[#1a2a44] flex items-center space-x-2">
                      <link.icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  <Link to="/premium" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-[#D4AF37] flex items-center space-x-2">
                    <Crown size={18} />
                    <span>Premium</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-red-400 flex items-center space-x-2">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
              {!user && (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#D4AF37] text-[#0A1628] px-4 py-2 rounded-md font-semibold">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
