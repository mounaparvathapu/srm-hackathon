import { useState, useEffect } from 'react';
import React from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../types';
import { 
  FileText, ShieldCheck, DollarSign, Briefcase, 
  User, Phone, MapPin, CheckCircle, AlertCircle,
  Upload, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function BorrowApply() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: 50000,
    purpose: '',
    duration: 12,
    preferredRate: 12,
    employmentType: 'Salaried',
    monthlyIncome: 30000,
    employerName: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    aadhaarNumber: '',
    panNumber: '',
    agreed: false
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
          setUser(docSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !formData.agreed) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        borrowerId: auth.currentUser.uid,
        amount: Number(formData.amount),
        purpose: formData.purpose,
        duration: Number(formData.duration),
        preferredRate: Number(formData.preferredRate),
        employmentType: formData.employmentType,
        monthlyIncome: Number(formData.monthlyIncome),
        employerName: formData.employerName,
        emergencyContact: {
          name: formData.emergencyName,
          relation: formData.emergencyRelation,
          phone: formData.emergencyPhone
        },
        status: 'pending',
        createdAt: serverTimestamp()
      });
      navigate('/borrowing-history');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div></div>;

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-[#0A1628]">Loan Application</h1>
          <p className="text-gray-500">Complete your profile and apply for a loan in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Details Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-[#0A1628] flex items-center gap-2 border-b pb-4">
              <DollarSign size={20} className="text-[#D4AF37]" />
              Loan Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amount Needed ($)</label>
                <input 
                  type="number" required min="1000"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Preferred Interest Rate (% p.a.)</label>
                <input 
                  type="number" required min="1" max="30" step="0.5"
                  value={formData.preferredRate}
                  onChange={(e) => setFormData({ ...formData, preferredRate: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Repayment Duration (Months)</label>
                <select 
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                >
                  {[3, 6, 12, 18, 24, 36, 48, 60].map(m => <option key={m} value={m}>{m} Months</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Purpose of Loan</label>
                <input 
                  type="text" required placeholder="e.g. Business Expansion, Education"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Employment Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-[#0A1628] flex items-center gap-2 border-b pb-4">
              <Briefcase size={20} className="text-[#D4AF37]" />
              Employment & Income
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                <select 
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Student">Student</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Monthly Income ($)</label>
                <input 
                  type="number" required
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Employer Name / Business Name</label>
                <input 
                  type="text" required
                  value={formData.employerName}
                  onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>
          </div>

          {/* KYC Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-[#0A1628] flex items-center gap-2 border-b pb-4">
              <ShieldCheck size={20} className="text-[#D4AF37]" />
              Identity Verification (KYC)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Aadhaar Number</label>
                <input 
                  type="text" required maxLength={12}
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">PAN Number</label>
                <input 
                  type="text" required maxLength={10}
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Upload Aadhaar (Front & Back)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Upload PAN Card</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-[#0A1628] flex items-center gap-2 border-b pb-4">
              <Phone size={20} className="text-[#D4AF37]" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Contact Name</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none" onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Relation</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none" onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                <input type="tel" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#D4AF37] outline-none" onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="bg-[#D4AF37]/10 p-6 rounded-xl border border-[#D4AF37]/20 space-y-4">
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" required
                checked={formData.agreed}
                onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#D4AF37] rounded focus:ring-[#D4AF37]" 
              />
              <p className="text-sm text-[#0A1628]">
                I hereby declare that the information provided is true and correct. I authorize Circular Funds to verify my KYC details and credit history. I agree to the terms of service and repayment policies.
              </p>
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0A1628] text-white py-4 rounded-lg font-bold text-xl hover:brightness-125 transition-all disabled:opacity-50"
          >
            {submitting ? 'Submitting Application...' : 'Submit Loan Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
