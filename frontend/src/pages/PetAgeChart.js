import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PetAgeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/pet-age-distribution')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pet Age Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="age" label={{ value: 'Age (Years)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Number of Pets', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PetAgeChart;
