import React from "react";

export default function InvestmentItem({ icon, name, amount, year, currentValue, growth }) {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-3">
        <img src={icon} alt={name} className="w-6 h-6" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">₹{amount} • {year}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-800">₹{currentValue}</p>
        <p className="text-green-500 text-xs">(+{growth}%)</p>
      </div>
    </div>
  );
}
