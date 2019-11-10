import { Paper } from '@material-ui/core';
// @ts-ignore
import preval from 'babel-plugin-preval/macro';
import React from 'react';
import { Flex } from 'rebass';

const version = preval`
const fs = require('fs');

module.exports = process.env.NODE_ENV === 'test'
  ? 0
  : JSON.parse(fs.readFileSync('../../package.json', { encoding: 'UTF-8' })).version;

`;

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => (
  <Paper>
    <Flex my={2} mx={3} justifyContent="flex-end">
      Version: {version}
    </Flex>
  </Paper>
);

export default Footer;
