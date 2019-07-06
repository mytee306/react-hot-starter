import { Typography } from '@material-ui/core';
import notFoundImgSrc from 'assets/img/ghost.svg';
import { CreateSimpleAction } from 'models/actions';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createTogglePageFound } from 'store/slices';
import Link from './Link';

export interface NotFoundProps {
  togglePageFound: CreateSimpleAction;
}

const NotFound: React.FC<NotFoundProps> = ({ togglePageFound }) => {
  useEffect(() => {
    togglePageFound();

    return () => {
      togglePageFound();
    };
  }, [togglePageFound]);

  return (
    <div
      style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}
    >
      <img style={{ width: '10vw' }} src={notFoundImgSrc} alt="not found" />
      <br />
      <br />
      <Typography variant="h4">Page not found</Typography>
      <br />
      <br />
      <Link to="/">
        <Typography variant="h5">Go back to Dashboard</Typography>
      </Link>
    </div>
  );
};
export default connect(
  null,
  { togglePageFound: createTogglePageFound },
)(NotFound);
