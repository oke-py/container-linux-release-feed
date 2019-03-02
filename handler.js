'use strict';

module.exports.run = async (event, context) => {
  const https = require('https');
  const rd = require('./src/release-date');
  const rn = require('./src/release-note');

  const channel = process.env.CHANNEL || 'stable';
  if (! ['stable', 'beta', 'alpha'].includes(channel)) {
    throw Error('Invalid release channel');
  }

  console.info(`start fetching ${channel} channel feed.`);

  const URL = `https://coreos.com/releases/releases-${channel}.json`;

  const { IncomingWebhook } = require('@slack/client');
  const url = process.env.SLACK_WEBHOOK_URL;
  const webhook = new IncomingWebhook(url);

  const postMessageToSlack = (version, releaseNotes) => {
    const securityFix = rn.replaceLinkFormat(rn.extractSecurityFixes(releaseNotes));
    webhook.send(`Container Linux ${version} has security fixes.\n${securityFix}`, function(err, res) {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Message sent: ', res);
      }
    });
  };

  const req = https.get(URL, (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      const releases = JSON.parse(body);
      let latest;
      for (latest in releases) break;
      if (rd.isIn24Hours(releases[latest]['release_date'])
          && rn.hasSecurityFixes(releases[latest]['release_notes'])) {
        postMessageToSlack(latest, releases[latest]['release_notes']);
      } else {
        console.log(`${channel} channel has no security fixes since ${latest}`);
      }
    });
  });

  req.on('error', (e) => {
    console.log(e.message);
  });

  req.end();

  return { message: 'executed successfully!', event };
};
