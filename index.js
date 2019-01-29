'use strict'

const https = require('https');
const dayjs = require('dayjs');

const channel = process.env.CHANNEL || 'stable';
if (! ['stable', 'beta', 'alpha'].includes(channel)) {
  console.error('Invalid release channel');
  process.exit(1);
}

const URL = `https://coreos.com/releases/releases-${channel}.json`;

const isIn24Hours = (dateString) => {
  const yesterday = dayjs().add(-1, 'day');
  return dayjs(dateString).isAfter(yesterday);
};

const hasSecurityFixes = (release_notes) => {
  return ~release_notes.indexOf('Security fixes:');
}

const extractSecurityFixes = (release_notes) => {
  const lines = release_notes.split("\n");
  let security_fix = [];

  for (let i = 0; i < lines.length; i++) {
    if (! lines[i]) {
      break;
    }
    security_fix.push(lines[i]);
  }

  return security_fix.join("\n");
};

const postMessageToSlack = (version, release_notes) => {
  const security_fix = extractSecurityFixes(release_notes);
  console.log(`Container Linux ${version} has security fixes.\n${security_fix}`);
}

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
    if (isIn24Hours(releases[latest]["release_date"])
        && hasSecurityFixes(releases[latest]["release_notes"])) {
      postMessageToSlack(latest, releases[latest]["release_notes"]);
    } else {
      console.log(`${channel} channel has no security fixes since ${latest}`);
    }
  });
});

req.on('error', (e) => {
  console.log(e.message);
});

req.end();
