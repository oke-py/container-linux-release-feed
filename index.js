'use strict'

const https = require('https');
const URL = 'https://coreos.com/releases/releases-stable.json';

const req = https.get(URL, (res) => {
  let body = '';
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', (res) => {
    res = JSON.parse(body);
    console.log(res);
  });
});

req.on('error', (e) => {
  console.log(e.message);
});

req.end();
