import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// More realistic dummy data generation
const generateDummyData = (type) => {
  const years = [2024, 2025, 2026, 2027];
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  
  let baseRevenue = 1000000; // Starting annual revenue
  let baseExpenses = 800000; // Starting annual expenses
  let baseAssets = 5000000; // Starting assets
  let baseLiabilities = 3000000; // Starting liabilities

  return years.flatMap(year => {
    const yearData = [];
    const annualGrowth = 1 + (Math.random() * 0.1); // 0-10% annual growth

    for (let month of months) {
      const seasonality = 1 + (Math.sin((parseInt(month) / 12) * Math.PI) * 0.1); // Seasonal fluctuation
      
      const revenue = (baseRevenue / 12) * seasonality;
      const expenses = (baseExpenses / 12) * (1 + (Math.random() * 0.05)); // Slight random variation in expenses
      
      const data = {
        date: `${month}/${year}`,
        revenue: revenue,
        expenses: expenses,
        profit: revenue - expenses,
        assets: baseAssets + (Math.random() * 100000) - 50000, // Slight fluctuation in assets
        liabilities: baseLiabilities + (Math.random() * 50000) - 25000, // Slight fluctuation in liabilities
        cashInflow: revenue * (1 + (Math.random() * 0.1)), // Cash inflow slightly higher than revenue
        cashOutflow: expenses * (1 + (Math.random() * 0.1)), // Cash outflow slightly higher than expenses
        type
      };

      yearData.push(data);
    }

    // Update base values for next year
    baseRevenue *= annualGrowth;
    baseExpenses *= (1 + (Math.random() * 0.05)); // Expenses grow slower than revenue
    baseAssets *= (1 + (Math.random() * 0.15)); // Assets grow faster
    baseLiabilities *= (1 + (Math.random() * 0.05)); // Liabilities grow slower

    return yearData;
  });
};

const dummyData = {
  actual: generateDummyData('actual'),
  plan: generateDummyData('plan')
};

// Input Sheet Component
const InputSheet = ({ id, data }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Input Sheet {id}</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Revenue</th>
            <th className="border border-gray-300 p-2">Expenses</th>
            <th className="border border-gray-300 p-2">Profit</th>
            <th className="border border-gray-300 p-2">Assets</th>
            <th className="border border-gray-300 p-2">Liabilities</th>
            <th className="border border-gray-300 p-2">Cash Inflow</th>
            <th className="border border-gray-300 p-2">Cash Outflow</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 24).map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">${item.revenue.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.expenses.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.profit.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.assets.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.liabilities.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.cashInflow.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">${item.cashOutflow.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Calculation Sheet Component
const CalculationSheet = ({ id, data }) => {
  const calculatedData = data.map(item => ({
    ...item,
    netAssets: item.assets - item.liabilities,
    netCashFlow: item.cashInflow - item.cashOutflow
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calculation Sheet {id}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Profit</th>
              <th className="border border-gray-300 p-2">Net Assets</th>
              <th className="border border-gray-300 p-2">Net Cash Flow</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData.slice(0, 24).map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border border-gray-300 p-2">{item.date}</td>
                <td className="border border-gray-300 p-2">${item.profit.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">${item.netAssets.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">${item.netCashFlow.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Financial Statement Component
const FinancialStatement = ({ data, title, keys }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            {keys.map(key => (
              <th key={key} className="border border-gray-300 p-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 24).map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border border-gray-300 p-2">{item.date}</td>
              {keys.map(key => (
                <td key={key} className="border border-gray-300 p-2">${item[key].toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Comparison Chart Component
const ComparisonChart = ({ actualData, planData, dataKey, title }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
        <Legend />
        <Line type="monotone" dataKey={dataKey} data={actualData} name="Actual" stroke="#8884d8" />
        <Line type="monotone" dataKey={dataKey} data={planData} name="Plan" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Main Financial Dashboard Component
const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('input-1');

  const renderContent = () => {
    if (activeTab.startsWith('input-')) {
      return <InputSheet id={activeTab.split('-')[1]} data={dummyData.actual} />;
    } else if (activeTab.startsWith('calc-')) {
      return <CalculationSheet id={activeTab.split('-')[1]} data={dummyData.actual} />;
    } else if (activeTab === 'output') {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Output Sheet</h2>
          <FinancialStatement data={dummyData.actual} title="Profit and Loss Statement" keys={['revenue', 'expenses', 'profit']} />
          <FinancialStatement data={dummyData.actual} title="Balance Sheet" keys={['assets', 'liabilities']} />
          <FinancialStatement data={dummyData.actual} title="Cash Flow Statement" keys={['cashInflow', 'cashOutflow']} />
          <ComparisonChart actualData={dummyData.actual} planData={dummyData.plan} dataKey="revenue" title="Revenue Comparison" />
          <ComparisonChart actualData={dummyData.actual} planData={dummyData.plan} dataKey="profit" title="Profit Comparison" />
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>
      <div className="mb-4 flex flex-wrap">
        {[1, 2, 3, 4, 5, 6].map(id => (
          <button 
            key={`input-${id}`}
            className={`mr-2 mb-2 px-4 py-2 rounded ${activeTab === `input-${id}` ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(`input-${id}`)}
          >
            Input {id}
          </button>
        ))}
        {[1, 2, 3, 4].map(id => (
          <button 
            key={`calc-${id}`}
            className={`mr-2 mb-2 px-4 py-2 rounded ${activeTab === `calc-${id}` ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(`calc-${id}`)}
          >
            Calc {id}
          </button>
        ))}
        <button 
          className={`mr-2 mb-2 px-4 py-2 rounded ${activeTab === 'output' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('output')}
        >
          Output
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default FinancialDashboard;