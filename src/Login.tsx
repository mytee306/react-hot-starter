import React, { SFC } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';

export interface LoginProps {}

const Login: SFC<LoginProps> = () => (
  <Card>
    <CardContent>
      <Typography variant="h2">Welcome</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained">Login</Button>
    </CardActions>
  </Card>
);

export default Login;
