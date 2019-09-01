import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDictionary } from 'store';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { dashboard } = useSelector(selectDictionary);

  return <Typography>{dashboard}</Typography>;
};
export default Dashboard;
