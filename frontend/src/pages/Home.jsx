import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { User, CreditCard, ArrowUpRight } from "lucide-react";
import funds from '../assets/funds.png';
import loan from '../assets/loan.png';
import bonds from '../assets/bonds.png';
import bank from '../assets/bank.png';
import MultiColorProgressBar from '../components/UI/MultiColorProgressBar';
import InvestmentItem from '../components/UI/InvestmentItem';
import GoalTracker from '../components/UI/GoalTracker';
import SchemeCard from '../components/UI/SchemeCard';
import ExpenseModal from '../components/UI/ExpenseModal';

const data = [
  { name: "Essentials", value: 60000, color: "#22c55e" },
  { name: "Waste", value: 20000, color: "#ef4444" },
];

const progressData = [
  { value: 30, color: "bg-red-500" },   // 30%
  { value: 40, color: "bg-green-500" }, // 40%
  { value: 30, color: "bg-blue-500" },  // 30%
];

const Home = () => {
//add expense
const [isModalOpen, setModalOpen] = useState(false);
const [user, setUser] = useState(null);
const handleSave = (expense) => {
  console.log("New Expense:", expense);
  // 👉 Here you can push to backend / state management
};

// dynamic username
useEffect(() => {
  axios.get("http://localhost:5000/api/users/profile", { withCredentials: true })
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
}, []);

  return (
    <section className="bg-white py-16 px-6 mt-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium mb-6"
        >
          ⭐ Start with just ₹10/day
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Invest Smart, <br /> Start Small
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
        >
          Build wealth with micro-investments. Safe, simple, and designed for
          everyone – even if you're new to investing.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { value: "₹10", label: "Minimum Investment" },
            { value: "12%+", label: "Expected Returns" },
            { value: "0", label: "Hidden Fees" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white shadow rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-gray-500 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div 
        className="mt-15 flex items-center justify-center gap-8 text-sm text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
          <span>🛡 SEBI Registered</span>
          <span>🏦 Bank Grade Security</span>
        </motion.div>
      </div>

 {/* Analytics*/}

    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Greeting */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Hi {user ? user.firstname : "Guest"}, here’s your financial health today.
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setModalOpen(true)} 
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-200 rounded-lg cursor-pointer"
            >
              Add Expense
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer">
              Invest Now
            </button>
            {/* Modal */}
            <ExpenseModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onSave={handleSave}
            />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold">Net Total</h2>
          <h2 className="text-lg font-bold">33,00,000</h2>
          <MultiColorProgressBar segments={progressData} />
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-purple-100 p-4 rounded-xl"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700">Income this Month</p>
          <h3 className="text-2xl font-bold">3,00,000</h3>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-red-100 p-4 rounded-xl"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700">Expenses this Month</p>
          <h3 className="text-2xl font-bold">80,000</h3>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-green-100 p-4 rounded-xl"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700">Savings Potential</p>
          <h3 className="text-2xl font-bold">5,60,000</h3>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="bg-blue-100 p-4 rounded-xl"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-gray-700">Investment Growth</p>
          <h3 className="text-2xl font-bold">20%</h3>
        </motion.div>
      </motion.div>

      {/* Expense Tracking & Wasted Money */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Expense Tracking */}
        <motion.div
          className="bg-white rounded-xl shadow p-4"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="font-semibold mb-4">Expense Tracking</h3>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex justify-between py-2">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  Transportation (36 transactions)
                </span>
                <span className="text-red-500 font-semibold">- ₹5300</span>
              </div>
            ))}
        </motion.div>

        {/* Wasted Money Chart */}
        <motion.div
          className="bg-white rounded-xl shadow p-4"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="font-semibold mb-4">Wasted Money This Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center font-bold text-xl">80,000</p>
          <p className="text-center text-gray-500 text-sm">
            You could have saved 25% more if you avoided overspending.
          </p>
        </motion.div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Investment Journey */}
        <motion.div
          className="bg-white p-4 rounded-lg shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-lg font-semibold mb-3">Your Investment Journey</h2>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <InvestmentItem
              icon={funds}
              name="Mutual Fund SIP"
              amount="50,000"
              year="2019"
              currentValue="70,000"
              growth="40"
            />
          </motion.div>
        </motion.div>

        {/* Financial Goal Tracker */}
        <motion.div
          className="bg-white p-4 rounded-lg shadow"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // triggers when 20% is visible
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-lg font-semibold mb-3">Your Financial Goal Tracker</h2>

          {/* Animate each GoalTracker individually */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GoalTracker title="Education Fund" completed={40} years={1} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GoalTracker title="Retirement Fund" completed={65} years={5} />
          </motion.div>
        </motion.div>

        {/* Smart Schemes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-lg font-semibold mb-3">Smart Schemes for You</h2>

          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SchemeCard
                img={loan}
                title="Mutual Funds"
                description="Best for long-term wealth creation"
              />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SchemeCard
                img={bank}
                title="Fixed Deposit"
                description="Stable returns with low risk"
              />
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SchemeCard
                img={bonds}
                title="Government Bonds"
                description="Safe investment with assured returns"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-xl shadow"
            >
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-600 my-2">
                Slate helps you see how many more days you need to work to reach
                your goal.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Regina Miles</p>
                  <p className="text-sm text-gray-500">Designer</p>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
    </section>
  )
}

export default Home;
