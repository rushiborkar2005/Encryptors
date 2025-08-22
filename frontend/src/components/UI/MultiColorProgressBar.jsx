import React from "react";

export default function MultiColorProgressBar({ segments }) {
  return (
    <div className="mt-6 h-4 w-full bg-gray-200 rounded-full flex overflow-hidden">
      {segments.map((seg, i) => (
        <div
          key={i}
          className={`${seg.color}`}
          style={{ width: `${seg.value}%` }}
        />
      ))}
    </div>
  );
}
