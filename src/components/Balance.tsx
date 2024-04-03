import React from 'react';
import { Typography } from '@mui/material';

interface BalanceProps {
  balance: number;
}

const BalanceComponent: React.FC<BalanceProps> = ({ balance }) => {
  return <Typography style={{color: 'white'}} variant="h6">Your Balance: ${balance}</Typography>;
};

export default BalanceComponent;