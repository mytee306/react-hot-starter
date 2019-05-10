import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';

export interface LoginProps {}

const Login: FC<LoginProps> = () => (
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
