// components/LicenseStatsCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', validations: 20 },
  { name: 'Feb', validations: 35 },
  { name: 'Mar', validations: 50 },
  { name: 'Apr', validations: 40 },
];

const LicenseStatsCard = () => {
  return (
    <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          License Validations
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="validations" stroke="#3f51b5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LicenseStatsCard;
