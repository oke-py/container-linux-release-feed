'use strict';

module.exports.run = async (event, context) => {
  const https = require('https');
  const axios = require('axios');
  const feed = require('./src/feed');
  const rd = require('./src/release-date');
  const rn = require('./src/release-note');

  const channel = process.env.CHANNEL || 'stable';
  if (! feed.isValidChannel(channel)) {
    throw new Error('Invalid release channel');
  }

  console.info(`start fetching ${channel} channel feed.`);

  const { IncomingWebhook } = require('@slack/client');
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

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

  const url = `https://coreos.com/releases/releases-${channel}.json`
  const getFeed = async url => {
    try {
      const response = await axios.get(url)
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  const releases = await getFeed(url);
  let latest;
  for (latest in releases) break;
  console.info(releases[latest]);
  if (rd.isIn24Hours(releases[latest]['release_date'])
      && rn.hasSecurityFixes(releases[latest]['release_notes'])) {
    postMessageToSlack(latest, releases[latest]['release_notes']);
  } else {
    console.info(`${channel} channel has no security fixes since ${latest}`);
  }

  return { message: 'executed successfully!', event };
};
