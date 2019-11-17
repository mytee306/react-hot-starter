import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

const portString = process.env.PORT || '3000';
const port = parseInt(portString, 10);

const app = express();

const buildPath = path.join(__dirname, '../build');

app.get('*', (_, res) => {
  const AppString = renderToString(<App />);

  res.send(
    fs.readFileSync(
      path
        .join(buildPath, 'index.html')
        .replace('<div id="root"></div>', `<div id="root">${AppString}</div>`),
    ),
  );
});

app.use(express.static(buildPath));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
