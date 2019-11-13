import { Typography } from '@material-ui/core';
import { Img } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'rebass';
import { selectDictionary } from 'store';
import quasar from '../assets/img/quasar.jpg';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { dashboard } = useSelector(selectDictionary);

  return (
    <Box>
      <Typography>{dashboard}</Typography>
      <Box my={5} mx="auto">
        <Img src={quasar} alt="quasar" />
      </Box>
    </Box>
  );
};
export default Dashboard;
