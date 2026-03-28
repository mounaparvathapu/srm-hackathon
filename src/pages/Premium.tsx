import { Crown, Check, Star, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Premium() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Standard Loan Limits',
        'Basic Analytics',
        'Standard Support',
        'Public Profile',
        'Standard Transaction Fees'
      ],
      cta: 'Current Plan',
      highlight: false
    },
    {
      name: 'Premium',
      price: '$29',
      period: 'per month',
      features: [
        'Higher Loan Limits',
        'Advanced Portfolio Analytics',
        '24/7 Priority Support',
        'Verified Premium Badge',
        'Lower Platform Fees',
        'Early Access to New Requests'
      ],
      cta: 'Upgrade Now',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per year',
      features: [
        'Unlimited Loan Limits',
        'Custom Risk Assessment',
        'Dedicated Account Manager',
        'API Access',
        'Zero Platform Fees',
        'White-label Reports'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest">
            <Crown size={16} />
            Premium Membership
          </div>
          <h1 className="text-5xl font-serif font-bold text-[#0A1628]">Elevate Your Experience</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Unlock exclusive benefits and advanced tools to maximize your financial growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white p-10 rounded-[2.5rem] shadow-sm border-2 transition-all hover:shadow-2xl ${
                plan.highlight ? 'border-[#D4AF37] scale-105 z-10' : 'border-transparent'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0A1628] px-6 py-2 rounded-full font-bold text-sm uppercase">
                  Most Popular
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0A1628]">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-serif font-bold text-[#0A1628]">{plan.price}</span>
                    <span className="text-gray-400 font-medium">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className={`mt-1 rounded-full p-0.5 ${plan.highlight ? 'bg-[#D4AF37] text-[#0A1628]' : 'bg-gray-100 text-gray-400'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                  plan.highlight 
                    ? 'bg-[#0A1628] text-white hover:brightness-125' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[3rem] p-12 shadow-sm overflow-hidden">
          <h3 className="text-3xl font-serif font-bold text-[#0A1628] mb-12 text-center">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-6 font-bold text-[#0A1628]">Feature</th>
                  <th className="py-6 font-bold text-[#0A1628] text-center">Free</th>
                  <th className="py-6 font-bold text-[#D4AF37] text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Loan Limit', free: '$10,000', premium: '$100,000+' },
                  { name: 'Platform Fee', free: '2.5%', premium: '0.5%' },
                  { name: 'Support', free: 'Email', premium: '24/7 Live Chat' },
                  { name: 'Portfolio Tools', free: 'Basic', premium: 'Advanced AI' },
                  { name: 'KYC Verification', free: 'Standard', premium: 'Priority' }
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-6 text-gray-600 font-medium">{row.name}</td>
                    <td className="py-6 text-center text-gray-400">{row.free}</td>
                    <td className="py-6 text-center text-[#0A1628] font-bold">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
