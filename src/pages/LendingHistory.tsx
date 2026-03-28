import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Loan } from '../types';
import { 
  History, Filter, Download, Calendar, 
  DollarSign, TrendingUp, Clock, CheckCircle2,
  AlertCircle, User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LendingHistory() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'loans'), where('lenderId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Loan));
      setLoans(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredLoans = loans.filter(loan => {
    if (filter === 'all') return true;
    return loan.status === filter;
  });

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div></div>;

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-[#0A1628]">Lending History</h1>
            <p className="text-gray-500">Monitor your investments and expected returns.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              {['all', 'active', 'completed', 'overdue'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold capitalize transition-all ${
                    filter === f ? 'bg-[#0A1628] text-white' : 'text-gray-500 hover:text-[#0A1628]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
            <p className="text-gray-400 text-xs font-bold uppercase">Total Principal Lent</p>
            <p className="text-2xl font-bold text-[#0A1628]">${loans.reduce((acc, l) => acc + l.amount, 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-2">
            <p className="text-gray-400 text-xs font-bold uppercase">Active Investments</p>
            <p className="text-2xl font-bold text-[#0A1628]">{loans.filter(l => l.status === 'active').length}</p>
          </div>
          <div className="bg-[#0A1628] p-6 rounded-2xl shadow-sm space-y-2">
            <p className="text-gray-300 text-xs font-bold uppercase">Expected Returns</p>
            <p className="text-2xl font-bold text-[#D4AF37]">${Math.round(loans.reduce((acc, l) => acc + (l.amount * l.interestRate / 100), 0)).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Borrower</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Investment</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Repayment</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      No lending history found.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center text-[#D4AF37]">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#0A1628]">Borrower #{loan.borrowerId.slice(0, 8)}</p>
                            <p className="text-xs text-gray-400">Started: {new Date(loan.startDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-bold text-[#0A1628]">${loan.amount.toLocaleString()}</p>
                          <p className="text-xs text-green-600 font-bold">+{loan.interestRate}% Return</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 font-medium">{loan.duration} Months</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32 space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-gray-400">
                            <span>{loan.repaymentProgress}% Progress</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 transition-all duration-500" 
                              style={{ width: `${loan.repaymentProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${
                          loan.status === 'active' ? 'bg-blue-50 text-blue-600' :
                          loan.status === 'completed' ? 'bg-green-50 text-green-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
