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
    const releases = JSON.parse(body);
    let latest;
    for (latest in releases) break;
    console.log(latest);
    console.log(releases[latest]);
  });
});

req.on('error', (e) => {
  console.log(e.message);
});

req.end();
