import { Typography } from '@material-ui/core';
import { CreateSimpleAction } from 'models';
import React, { useEffect } from 'react';
import { Ghost } from 'react-kawaii';
import { connect } from 'react-redux';
import { createTogglePageFound } from 'store';
import Link from './Link';
import { Box } from 'rebass';

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
    <Box
      mt={4}
      style={{
        display: 'grid',
        alignContent: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'grid', justifyItems: 'center' }}>
        <Ghost mood="shocked" />
        <br />
        <br />
        <Typography variant="h4">Page not found</Typography>
        <br />
        <br />
        <Link to="/">
          <Typography variant="h5">Go back to Dashboard</Typography>
        </Link>
      </div>
    </Box>
  );
};
export default connect(
  null,
  { togglePageFound: createTogglePageFound },
)(NotFound);
