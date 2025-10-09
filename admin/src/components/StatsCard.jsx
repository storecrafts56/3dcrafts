import React from 'react';

const StatsCard = ({ title, value, icon: Icon, change, changeType = 'positive' }) => {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? '+' : '-'}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${
          changeType === 'positive' ? 'bg-green-100' : 'bg-blue-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            changeType === 'positive' ? 'text-green-600' : 'text-blue-600'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;