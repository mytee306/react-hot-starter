import { ServerStyleSheets } from '@material-ui/core';
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

const sheets = new ServerStyleSheets();

const AppString = renderToString(sheets.collect(<App />));

const css = sheets.toString();

const indexHtml = fs
  .readFileSync(path.join(buildPath, 'index.html'), {
    encoding: 'UTF-8',
  })
  .replace('<div id="root"></div>', `<div id="root">${AppString}</div>`)
  .replace(/(?=\s*<\/head>)/, `\n  <style id="jss-server-side">${css}</style>`);

app.get('*', (_, res) => {
  res.send(indexHtml);
});

app.use(express.static(buildPath));

app.listen(port, () => {
  console.log(`http://localhost:${port}`); // eslint-disable-line no-console
});
