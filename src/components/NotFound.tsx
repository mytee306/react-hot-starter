import { Typography } from '@material-ui/core';
import React from 'react';
import notFoundImgSrc from '../img/ghost.svg';
import Link from './Link';

const NotFound: React.FC = () => (
  <div
    style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}
  >
    <img style={{ width: '15vw' }} src={notFoundImgSrc} alt="not found" />
    <br />
    <br />
    <Typography variant="h4">Page not found</Typography>
    <br />
    <br />
    <Link to="/">
      <Typography variant="h5">Back to Dashboard</Typography>
    </Link>
  </div>
);

export default NotFound;
