'use strict'

const https = require('https');
const URL = 'https://coreos.com/releases/releases-stable.json';

const isIn24Hours = (dateString) => {
  console.log(dateString);
  return true;
};

const hasSecurityFixes = (release_notes) => {
  return ~release_notes.indexOf('Security fixes:');
}

const postMessageToSlack = (version, release_notes) => {
  console.log(`Container Linux ${version} has security fixes:\n${release_notes}`);
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
    }
  });
});

req.on('error', (e) => {
  console.log(e.message);
});

req.end();
