import React from "react";

export default function GoalTracker({ title, completed, years }) {
  return (
    <div className="p-3 flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-full">
          🚍 {/* You can replace with an icon */}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{years} years to complete</p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-between text-xs mb-1">
          <span>{completed}% completed</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${completed}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
