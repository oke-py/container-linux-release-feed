'use strict';

module.exports.run = async (event, context) => {
  const { IncomingWebhook } = require('@slack/client');
  const axios = require('axios');
  const feed = require('./src/feed');
  const rd = require('./src/release-date');
  const rn = require('./src/release-note');

  const channel = process.env.CHANNEL || 'stable';
  if (! feed.isValidChannel(channel)) {
    throw new Error('Invalid release channel');
  }

  console.info(`start fetching ${channel} channel feed.`);

  const url = `https://coreos.com/releases/releases-${channel}.json`;
  const getFeed = async url => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const releases = await getFeed(url);
  const latest = feed.getLatestVersion(releases);
  console.info(`successfully fetched the latest version.\n${JSON.stringify(releases[latest], undefined, 2)}`);

  const postMessageToSlack = (version, releaseNotes) => {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    const securityFix = rn.replaceLinkFormat(rn.extractSecurityFixes(releaseNotes));
    const message = `Container Linux ${version} has security fixes.\n${securityFix}`;

    console.info(`start posting notice to slack.\n${message}`);
    return webhook.send(message).then((res) => {
      console.info(res);
    }).catch((error) => {
      throw new Error(error);
    });
  };

  if (rd.isIn24Hours(releases[latest]['release_date'])
      && rn.hasSecurityFixes(releases[latest]['release_notes'])) {
    await postMessageToSlack(latest, releases[latest]['release_notes']);
  } else {
    const message = `${channel} channel has no security fixes since ${latest}`;
    console.info(message);
    return {message, event, context};
  }

  return { message: 'executed successfully!', event, context };
};
