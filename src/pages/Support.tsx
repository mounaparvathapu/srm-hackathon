import { useState } from 'react';
import { 
  HelpCircle, Mail, Phone, MessageSquare, 
  ChevronDown, ChevronUp, Send, Headset
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Support() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I start lending on Circular Funds?",
      a: "To start lending, simply register as a Lender, complete your KYC verification, and browse through the borrower requests in the Lender Dashboard. You can then choose to fund a loan that meets your criteria."
    },
    {
      q: "Is my money safe?",
      a: "We implement bank-grade security and mandatory KYC verification for all users. While peer-to-peer lending carries inherent risks, our vetting process and dispute resolution team work to minimize them."
    },
    {
      q: "What are the platform fees?",
      a: "Circular Funds charges a small platform fee on successful transactions. Premium members enjoy significantly lower fees and priority support."
    },
    {
      q: "How is the interest rate determined?",
      a: "Borrowers set a preferred rate, but Lenders can negotiate this rate based on the borrower's profile and credit score."
    }
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl font-serif font-bold text-[#0A1628]">Help & Support</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We're here to help you navigate your financial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-8">
              <h3 className="text-2xl font-bold text-[#0A1628]">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><Mail size={24} /></div>
                  <div>
                    <p className="font-bold text-[#0A1628]">Email Support</p>
                    <p className="text-gray-500">support@circularfunds.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><Phone size={24} /></div>
                  <div>
                    <p className="font-bold text-[#0A1628]">Phone Support</p>
                    <p className="text-gray-500">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl"><MessageSquare size={24} /></div>
                  <div>
                    <p className="font-bold text-[#0A1628]">Live Chat</p>
                    <p className="text-gray-500">Available 24/7 for Premium</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#0A1628] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-125 transition-all">
                <Headset size={20} /> Start Live Chat
              </button>
            </div>
          </div>

          {/* FAQ & Form */}
          <div className="lg:col-span-2 space-y-12">
            {/* FAQs */}
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-[#0A1628]">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full py-4 flex justify-between items-center text-left hover:text-[#D4AF37] transition-colors"
                    >
                      <span className="font-bold text-[#0A1628]">{faq.q}</span>
                      {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-gray-500 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-8">
              <h3 className="text-2xl font-bold text-[#0A1628]">Send us a Message</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#D4AF37] outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#D4AF37] outline-none" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#D4AF37] outline-none" placeholder="How can we help you?"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="button" className="bg-[#D4AF37] text-[#0A1628] px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition-all">
                    <Send size={20} /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
