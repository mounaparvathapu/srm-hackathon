import { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  PieChart as PieIcon, 
  DollarSign, 
  Calendar,
  Percent
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Calculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [duration, setDuration] = useState(12);
  const [type, setType] = useState<'simple' | 'compound' | 'emi'>('emi');

  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0
  });

  useEffect(() => {
    calculate();
  }, [principal, rate, duration, type]);

  const calculate = () => {
    const P = principal;
    const R = rate / 100;
    const T = duration / 12;
    const n = 12; // monthly compounding

    let totalAmount = 0;
    let totalInterest = 0;
    let monthlyEMI = 0;

    if (type === 'simple') {
      totalInterest = (P * rate * duration) / (100 * 12);
      totalAmount = P + totalInterest;
      monthlyEMI = totalAmount / duration;
    } else if (type === 'compound') {
      totalAmount = P * Math.pow(1 + R / n, n * T);
      totalInterest = totalAmount - P;
      monthlyEMI = totalAmount / duration;
    } else {
      // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
      const r = rate / (12 * 100);
      const N = duration;
      monthlyEMI = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
      totalAmount = monthlyEMI * N;
      totalInterest = totalAmount - P;
    }

    setResults({
      monthlyEMI: Math.round(monthlyEMI),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
  };

  const chartData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: results.totalInterest }
  ];

  const COLORS = ['#0A1628', '#D4AF37'];

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-[#0A1628]">Interest Calculator</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Plan your finances better. Calculate your loan repayments and interest earnings with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  <span>Principal Amount</span>
                  <span className="text-[#D4AF37] font-bold">${principal.toLocaleString()}</span>
                </label>
                <input 
                  type="range" min="1000" max="1000000" step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>$1K</span>
                  <span>$1M</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  <span>Interest Rate (%)</span>
                  <span className="text-[#D4AF37] font-bold">{rate}%</span>
                </label>
                <input 
                  type="range" min="1" max="30" step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  <span>Duration (Months)</span>
                  <span className="text-[#D4AF37] font-bold">{duration} Months</span>
                </label>
                <input 
                  type="range" min="1" max="60" step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1 Mo</span>
                  <span>60 Mo</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Calculation Type</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'emi', label: 'EMI (Standard)' },
                  { id: 'simple', label: 'Simple Interest' },
                  { id: 'compound', label: 'Compound Interest' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id as any)}
                    className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      type === t.id 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#0A1628] font-bold' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                key={results.monthlyEMI}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-[#D4AF37] space-y-2"
              >
                <p className="text-gray-400 text-sm font-medium">Monthly EMI</p>
                <p className="text-2xl font-bold text-[#0A1628]">${results.monthlyEMI.toLocaleString()}</p>
              </motion.div>
              <motion.div 
                key={results.totalInterest}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-[#0A1628] space-y-2"
              >
                <p className="text-gray-400 text-sm font-medium">Total Interest</p>
                <p className="text-2xl font-bold text-[#0A1628]">${results.totalInterest.toLocaleString()}</p>
              </motion.div>
              <motion.div 
                key={results.totalAmount}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#0A1628] p-6 rounded-2xl shadow-md space-y-2"
              >
                <p className="text-gray-300 text-sm font-medium">Total Payable</p>
                <p className="text-2xl font-bold text-[#D4AF37]">${results.totalAmount.toLocaleString()}</p>
              </motion.div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#0A1628]">Breakdown Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#0A1628]"></div>
                      <span className="text-gray-500">Principal Amount</span>
                    </div>
                    <span className="font-bold text-[#0A1628]">${principal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                      <span className="text-gray-500">Total Interest</span>
                    </div>
                    <span className="font-bold text-[#0A1628]">${results.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500 font-bold">Total Amount</span>
                    <span className="font-bold text-[#D4AF37] text-xl">${results.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
