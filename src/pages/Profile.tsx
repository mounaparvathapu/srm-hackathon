import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  CreditCard, ShieldCheck, Edit2, CheckCircle, 
  AlertCircle, TrendingUp, TrendingDown, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUser(data);
          setFormData(data);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (!auth.currentUser || !user) return;
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), formData);
      setUser({ ...user, ...formData } as UserProfile);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#D4AF37]"></div></div>;
  if (!user) return <div className="text-center py-20">User not found.</div>;

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Card */}
        <div className="bg-[#0A1628] rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-700 rounded-full border-4 border-[#D4AF37] flex items-center justify-center overflow-hidden">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full text-[#0A1628]">
                <Edit2 size={16} />
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl font-serif font-bold">{user.fullName}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                  user.kycStatus === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {user.kycStatus === 'verified' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                  {user.kycStatus}
                </span>
              </div>
              <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} /> {user.email}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Role</p>
                  <p className="font-bold text-[#D4AF37] capitalize">{user.role}</p>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <p className="text-xs text-gray-500 uppercase">Credit Score</p>
                  <p className="font-bold text-[#D4AF37]">{user.creditScore || 'N/A'}</p>
                </div>
                {user.isPremium && (
                  <div className="bg-[#D4AF37]/20 px-4 py-2 rounded-lg border border-[#D4AF37]/30 flex items-center gap-2">
                    <Star size={16} className="text-[#D4AF37]" />
                    <p className="font-bold text-[#D4AF37]">Premium Member</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="font-bold text-[#0A1628] border-b pb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingDown size={20} /></div>
                    <span className="text-gray-500">Total Borrowed</span>
                  </div>
                  <span className="font-bold text-[#0A1628]">$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                    <span className="text-gray-500">Total Lent</span>
                  </div>
                  <span className="font-bold text-[#0A1628]">$0.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="font-bold text-[#0A1628] border-b pb-4">KYC Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-[#D4AF37]" />
                    <span className="text-sm font-medium">Aadhaar Card</span>
                  </div>
                  <span className="text-xs text-green-600 font-bold">Uploaded</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-[#D4AF37]" />
                    <span className="text-sm font-medium">PAN Card</span>
                  </div>
                  <span className="text-xs text-green-600 font-bold">Uploaded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#0A1628]">Personal Details</h3>
              <button 
                onClick={() => editing ? handleUpdate() : setEditing(true)}
                className="flex items-center gap-2 text-[#D4AF37] font-bold hover:brightness-90"
              >
                {editing ? <CheckCircle size={20} /> : <Edit2 size={20} />}
                {editing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                <input 
                  disabled={!editing}
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <input 
                  disabled={!editing}
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Date of Birth</label>
                <input 
                  type="date"
                  disabled={!editing}
                  value={formData.dob || ''}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Gender</label>
                <select 
                  disabled={!editing}
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">City</label>
                <input 
                  disabled={!editing}
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">State</label>
                <input 
                  disabled={!editing}
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-lg p-3 text-[#0A1628] font-medium disabled:opacity-70"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="font-bold text-[#0A1628] mb-6 flex items-center gap-2">
                <CreditCard size={18} className="text-[#D4AF37]" />
                Bank Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Account Number</label>
                  <p className="font-medium text-[#0A1628]">{user.bankDetails?.accountNumber || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">IFSC Code</label>
                  <p className="font-medium text-[#0A1628]">{user.bankDetails?.ifsc || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Bank Name</label>
                  <p className="font-medium text-[#0A1628]">{user.bankDetails?.bankName || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
