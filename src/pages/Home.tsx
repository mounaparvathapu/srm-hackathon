import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, Users, 
  TrendingUp, CheckCircle2, Star, Quote
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { label: 'Total Lent', value: '$12.5M+', icon: TrendingUp },
    { label: 'Total Borrowed', value: '$10.2M+', icon: Zap },
    { label: 'Active Users', value: '45K+', icon: Users },
    { label: 'Success Rate', value: '99.2%', icon: CheckCircle2 },
  ];

  const steps = [
    { title: 'Register', desc: 'Create your account and complete KYC verification.', icon: '01' },
    { title: 'Apply/Offer', desc: 'Borrowers apply for loans; Lenders offer funds.', icon: '02' },
    { title: 'Transfer', desc: 'Funds are securely transferred after mutual agreement.', icon: '03' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#0A1628]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Borrow <span className="text-[#D4AF37]">Smart.</span><br />
              Lend <span className="text-[#D4AF37]">Safe.</span><br />
              Grow Together.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              The ultimate peer-to-peer lending platform designed for transparency, security, and mutual growth. 
              Join thousands of users building a better financial future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/borrow-apply" className="bg-[#D4AF37] text-[#0A1628] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#C49F27] transition-all flex items-center space-x-2">
                <span>Borrow Money</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/lender-dashboard" className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#D4AF37] hover:text-[#0A1628] transition-all">
                Lend Money
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 bg-[#1a2a44] p-8 rounded-2xl border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A1628]">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Investment Growth</p>
                    <p className="text-white font-bold text-xl">+12.4% p.a.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Active Loans</p>
                  <p className="text-white font-bold text-xl">1,240</p>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#0A1628] p-4 rounded-xl flex items-center justify-between border border-gray-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                      <div>
                        <div className="h-4 w-24 bg-gray-800 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-900 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-12 bg-[#D4AF37]/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D4AF37] rounded-full blur-[120px] opacity-20"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#F4F6F9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="flex justify-center text-[#D4AF37] mb-2">
                  <stat.icon size={32} />
                </div>
                <p className="text-3xl font-bold text-[#0A1628]">{stat.value}</p>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#0A1628]">How Circular Funds Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our platform simplifies the lending process into three easy steps, 
            ensuring security and transparency at every stage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.title} className="relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <span className="absolute -top-6 left-8 text-6xl font-serif font-bold text-gray-100 group-hover:text-[#D4AF37]/10 transition-colors">
                {step.icon}
              </span>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-[#0A1628]">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Security */}
      <section className="bg-[#0A1628] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Your Security is Our <br />
              <span className="text-[#D4AF37]">Top Priority.</span>
            </h2>
            <div className="space-y-6">
              {[
                'Bank-grade 256-bit encryption for all data.',
                'Mandatory KYC verification for all users.',
                'Secure escrow-like fund transfer mechanism.',
                'Automated repayment reminders and tracking.'
              ].map((item) => (
                <div key={item} className="flex items-start space-x-4">
                  <ShieldCheck className="text-[#D4AF37] shrink-0" size={24} />
                  <p className="text-gray-300 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1a2a44] p-8 rounded-2xl space-y-4">
              <Star className="text-[#D4AF37]" size={32} />
              <h4 className="text-xl font-bold">Verified Profiles</h4>
              <p className="text-gray-400 text-sm">Every borrower and lender is thoroughly vetted.</p>
            </div>
            <div className="bg-[#1a2a44] p-8 rounded-2xl space-y-4 mt-8">
              <TrendingUp className="text-[#D4AF37]" size={32} />
              <h4 className="text-xl font-bold">Smart Analytics</h4>
              <p className="text-gray-400 text-sm">Track your portfolio with advanced data tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#0A1628]">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Lender', text: 'Circular Funds has completely changed how I invest. The platform is secure and the returns are consistent.' },
              { name: 'Michael Chen', role: 'Borrower', text: 'I needed a quick loan for my startup. The process was transparent and I got funded within 48 hours.' },
              { name: 'David Wilson', role: 'Lender', text: 'The KYC verification gives me peace of mind. I know exactly who I am lending to and for what purpose.' }
            ].map((t) => (
              <div key={t.name} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                <Quote className="text-[#D4AF37]" size={32} />
                <p className="text-gray-600 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h5 className="font-bold text-[#0A1628]">{t.name}</h5>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#D4AF37]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628]">Ready to Start Your Journey?</h2>
          <p className="text-xl text-[#0A1628]/80">
            Join Circular Funds today and experience the future of peer-to-peer finance.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-[#0A1628] text-white px-10 py-4 rounded-lg font-bold text-lg hover:brightness-125 transition-all">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
