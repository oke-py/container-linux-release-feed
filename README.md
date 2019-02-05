# container-linux-release-feed

[![Build Status](https://travis-ci.org/oke-py/container-linux-release-feed.svg?branch=master)](https://travis-ci.org/oke-py/container-linux-release-feed)

post Container Linux release feed to Slack

## Installation

```bash
$ git clone https://github.com/oke-py/container-linux-release-feed.git
$ cd container-linux-release-feed
$ npm install
```

## Execution

### env

- SLACK_WEBHOOK_URL **required**
- CHANNEL **optional**
  - stable (default)
  - beta
  - alpha

### command

```bash
$ SLACK_WEBHOOK_URL=xxx CHANNEL=beta node index.js
```
