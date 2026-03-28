import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, query, where, getDocs, doc, 
  getDoc, updateDoc, addDoc, serverTimestamp, onSnapshot 
} from 'firebase/firestore';
import { LoanApplication, UserProfile } from '../types';
import { 
  Search, Filter, Eye, CheckCircle, XCircle, 
  MessageSquare, DollarSign, Calendar, User,
  ShieldCheck, Briefcase, Phone, MapPin, CreditCard,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LenderDashboard() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [borrowerDetails, setBorrowerDetails] = useState<UserProfile | null>(null);
  const [showFullKYC, setShowFullKYC] = useState(false);
  const [negotiationRate, setNegotiationRate] = useState<number>(0);

  useEffect(() => {
    const q = query(collection(db, 'applications'), where('status', 'in', ['pending', 'negotiating']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanApplication));
      setApplications(apps);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const viewDetails = async (app: LoanApplication) => {
    setSelectedApp(app);
    setNegotiationRate(app.preferredRate);
    const userDoc = await getDoc(doc(db, 'users', app.borrowerId));
    if (userDoc.exists()) {
      setBorrowerDetails(userDoc.data() as UserProfile);
    }
    setShowFullKYC(false);
  };

  const handleAction = async (status: 'accepted' | 'rejected' | 'negotiating') => {
    if (!selectedApp || !auth.currentUser) return;

    try {
      if (status === 'accepted') {
        // Create a new loan
        await addDoc(collection(db, 'loans'), {
          borrowerId: selectedApp.borrowerId,
          lenderId: auth.currentUser.uid,
          amount: selectedApp.amount,
          interestRate: negotiationRate || selectedApp.preferredRate,
          duration: selectedApp.duration,
          startDate: serverTimestamp(),
          status: 'active',
          repaymentProgress: 0,
          nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      await updateDoc(doc(db, 'applications', selectedApp.id), { 
        status,
        ...(status === 'negotiating' ? { preferredRate: negotiationRate } : {})
      });
      
      setSelectedApp(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div></div>;

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-[#0A1628]">Lender Dashboard</h1>
            <p className="text-gray-500">Browse and manage loan requests from verified borrowers.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search requests..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none" />
            </div>
            <button className="bg-white p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-[#0A1628]">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center space-y-4 border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <DollarSign size={32} />
                </div>
                <p className="text-gray-500 font-medium">No active loan requests found.</p>
              </div>
            ) : (
              applications.map((app) => (
                <motion.div 
                  key={app.id} layoutId={app.id}
                  className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 transition-all hover:shadow-md cursor-pointer ${
                    selectedApp?.id === app.id ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/10' : 'border-transparent'
                  }`}
                  onClick={() => viewDetails(app)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0A1628] rounded-full flex items-center justify-center text-white font-bold">
                          {app.purpose.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0A1628]">{app.purpose}</h3>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">ID: {app.id.slice(0, 8)}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1"><DollarSign size={14} /> <span className="font-bold text-[#0A1628]">${app.amount.toLocaleString()}</span></div>
                        <div className="flex items-center gap-1"><Calendar size={14} /> {app.duration} Months</div>
                        <div className="flex items-center gap-1"><TrendingUp size={14} /> {app.preferredRate}% Rate</div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedApp && borrowerDetails ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24"
                >
                  <div className="bg-[#0A1628] p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{borrowerDetails.fullName}</h3>
                        <p className="text-gray-400 text-sm">{borrowerDetails.city}, {borrowerDetails.state}</p>
                      </div>
                      <div className="bg-[#D4AF37] text-[#0A1628] px-3 py-1 rounded-lg text-xs font-bold">
                        Score: {borrowerDetails.creditScore || '750'}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Loan Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-400 uppercase font-bold">Amount</p>
                        <p className="text-xl font-bold text-[#0A1628]">${selectedApp.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-400 uppercase font-bold">Duration</p>
                        <p className="text-xl font-bold text-[#0A1628]">{selectedApp.duration} Mo</p>
                      </div>
                    </div>

                    {/* Borrower Info */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-[#0A1628] flex items-center gap-2 border-b pb-2">
                        <User size={18} className="text-[#D4AF37]" />
                        Borrower Profile
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Briefcase size={16} className="text-gray-400" />
                          <span>{borrowerDetails.employment?.type || 'Salaried'} @ {borrowerDetails.employment?.employer || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <DollarSign size={16} className="text-gray-400" />
                          <span>Monthly Income: ${borrowerDetails.employment?.income?.toLocaleString() || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* KYC Reveal Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h4 className="font-bold text-[#0A1628] flex items-center gap-2">
                          <ShieldCheck size={18} className="text-[#D4AF37]" />
                          KYC Details
                        </h4>
                        {!showFullKYC && (
                          <button 
                            onClick={() => setShowFullKYC(true)}
                            className="text-xs font-bold text-[#D4AF37] hover:underline"
                          >
                            Reveal Full KYC
                          </button>
                        )}
                      </div>
                      
                      {showFullKYC ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-gray-50 p-4 rounded-xl">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Aadhaar:</span> <span className="font-mono font-bold">{borrowerDetails.aadhaarNumber || 'XXXX-XXXX-1234'}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">PAN:</span> <span className="font-mono font-bold">{borrowerDetails.panNumber || 'XXXXX1234X'}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-bold">{borrowerDetails.phone}</span></div>
                            <div className="pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-400 uppercase font-bold mb-2">Bank Info</p>
                              <div className="flex justify-between"><span className="text-gray-500">Bank:</span> <span className="font-bold">{borrowerDetails.bankDetails?.bankName}</span></div>
                              <div className="flex justify-between"><span className="text-gray-500">A/C:</span> <span className="font-bold">{borrowerDetails.bankDetails?.accountNumber}</span></div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="bg-gray-50 p-6 rounded-xl text-center space-y-2 border border-dashed border-gray-300">
                          <ShieldCheck size={24} className="mx-auto text-gray-300" />
                          <p className="text-xs text-gray-500">Accept to lend to view full KYC and contact details.</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Negotiate Interest Rate (%)</label>
                        <input 
                          type="number" step="0.5"
                          value={negotiationRate}
                          onChange={(e) => setNegotiationRate(Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-bold text-[#0A1628]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => handleAction('rejected')}
                          className="flex items-center justify-center gap-2 py-3 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
                        >
                          <XCircle size={18} /> Reject
                        </button>
                        <button 
                          onClick={() => handleAction('negotiating')}
                          className="flex items-center justify-center gap-2 py-3 border-2 border-blue-100 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                        >
                          <MessageSquare size={18} /> Negotiate
                        </button>
                      </div>
                      <button 
                        onClick={() => handleAction('accepted')}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-[#0A1628] text-white rounded-xl font-bold hover:brightness-125 transition-all shadow-lg"
                      >
                        <CheckCircle size={20} /> Accept & Fund Loan
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-gray-100 h-[600px] flex flex-col justify-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                    <Eye size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1628]">Select a Request</h3>
                  <p className="text-gray-400">Click on a loan request to view full details and take action.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
