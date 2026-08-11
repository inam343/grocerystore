import React from 'react';
import { FaRegUser, FaGift, FaArrowUp } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa6';
import { BiCategory } from 'react-icons/bi';
import ProductTable from '../componants/product';
import UsersTable from '../componants/Admuser';

const stats = [
  {
    label: 'Total Users',
    value: '3,000',
    change: '+12% this month',
    gradient: 'from-emerald-400 to-emerald-600',
    icon: <FaRegUser size={24} />,
  },
  {
    label: 'Total Orders',
    value: '45',
    change: '+5% this week',
    gradient: 'from-blue-500 to-blue-700',
    icon: <FaGift size={24} />,
  },
  {
    label: 'Total Products',
    value: '30',
    change: '+3 added today',
    gradient: 'from-violet-400 to-violet-600',
    icon: <FaProductHunt size={24} />,
  },
  {
    label: 'Total Categories',
    value: '45',
    change: '+2 this month',
    gradient: 'from-orange-400 to-orange-600',
    icon: <BiCategory size={24} />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">

      {/* Welcome bar */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome back, Admin 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening in your store today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${s.gradient} rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <span className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                <FaArrowUp size={9} />
                Up
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{s.value}</p>
            <p className="text-xs sm:text-sm font-medium opacity-90 mt-1">{s.label}</p>
            <p className="text-xs opacity-70 mt-1 sm:mt-2">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Tables */}
      <ProductTable />
      <UsersTable />

    </div>
  );
}
