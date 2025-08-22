import React from "react";

export default function SchemeCard({img, title, description }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm flex flex-col items-center">
      <img src={img} alt="scheme" className="w-16 h-16 mb-3" />
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-gray-500 text-center mb-4">{description}</p>
      <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition cursor-pointer">
        Invest Now
      </button>
    </div>
  );
}
