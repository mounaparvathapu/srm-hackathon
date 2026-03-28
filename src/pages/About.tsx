import { ShieldCheck, Users, Target, Rocket, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#0A1628] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold"
          >
            Our Mission & <span className="text-[#D4AF37]">Vision</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Circular Funds is more than just a lending platform. We are a community-driven financial ecosystem 
            dedicated to bridging the gap between those who have capital and those who need it.
          </p>
        </div>
      </section>

      {/* Mission/Vision Cards */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#F4F6F9] p-12 rounded-3xl space-y-6">
            <div className="w-16 h-16 bg-[#0A1628] rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0A1628]">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To democratize access to credit by providing a secure, transparent, and efficient peer-to-peer 
              lending platform that empowers individuals and small businesses to achieve their financial goals.
            </p>
          </div>
          <div className="bg-[#0A1628] p-12 rounded-3xl space-y-6 text-white">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-[#0A1628]">
              <Rocket size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#D4AF37]">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              To become the world's most trusted decentralized financial network, where every individual 
              has the opportunity to grow their wealth and access capital without traditional barriers.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Detail */}
      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#0A1628]">Why Choose Circular Funds?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Transparency', desc: 'No hidden fees or complex terms. Everything is clear from the start.', icon: ShieldCheck },
              { title: 'Community Driven', desc: 'Join a network of verified individuals helping each other grow.', icon: Users },
              { title: 'Secure & Safe', desc: 'Bank-grade security and mandatory KYC for all participants.', icon: ShieldCheck }
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
                <div className="text-[#D4AF37]"><item.icon size={32} /></div>
                <h3 className="text-xl font-bold text-[#0A1628]">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#0A1628]">Meet Our Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl mb-4"></div>
              <h4 className="text-xl font-bold text-[#0A1628]">Team Member {i}</h4>
              <p className="text-[#D4AF37] font-semibold">Co-Founder & CEO</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
