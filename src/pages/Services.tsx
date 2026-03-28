import { 
  Zap, ShieldCheck, PieChart, 
  UserCheck, MessageSquare, Headset,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: 'Quick Loans',
      desc: 'Get access to funds within 48 hours of application approval. No lengthy paperwork or bank visits.',
      icon: Zap,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Secure Lending',
      desc: 'Lenders can diversify their portfolio by lending to multiple verified borrowers with custom rates.',
      icon: ShieldCheck,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'EMI Plans',
      desc: 'Flexible repayment schedules tailored to your monthly income and financial capacity.',
      icon: PieChart,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'KYC Verification',
      desc: 'Rigorous identity checks and credit scoring to ensure a safe environment for all users.',
      icon: UserCheck,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Dispute Resolution',
      desc: 'Dedicated team to handle any disagreements or issues between borrowers and lenders.',
      icon: MessageSquare,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: '24/7 Support',
      desc: 'Our support team is always available to assist you with any queries or technical issues.',
      icon: Headset,
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl font-serif font-bold text-[#0A1628]">Our Services</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Comprehensive financial solutions designed for the modern peer-to-peer landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-[#D4AF37]/20"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1628] mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                {service.desc}
              </p>
              <Link to="/login" className="flex items-center gap-2 text-[#D4AF37] font-bold group-hover:gap-4 transition-all">
                <span>Learn More</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 bg-[#0A1628] rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Ready to take the next step?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users and experience the Circular Funds difference today.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/login" className="bg-[#D4AF37] text-[#0A1628] px-10 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all">
                Get Started
              </Link>
              <Link to="/calculator" className="border-2 border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Calculate ROI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
