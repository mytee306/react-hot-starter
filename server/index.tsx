import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

dotenv.config({ path: '../.env.development.local' });

const portString = process.env.PORT || '3000';
const port = parseInt(portString, 10);

const app = express();

const buildPath = path.join(__dirname, '../build');

const AppString = renderToString(<App />);

const indexHtml = fs.readFileSync(
  path
    .join(buildPath, 'index.html')
    .replace('<div id="root"></div>', `<div id="root">${AppString}</div>`),
);

app.use(express.static(buildPath));

app.get('*', (_, res) => {
  res.send(indexHtml);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
