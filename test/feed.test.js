/* eslint-env mocha */
'use strict';

const assert = require('assert');
const feed = require('../src/feed');

describe('feed', () => {
  describe('#isValidChannel()', () => {
    it('should return true for a valid channel', () => {
      assert.equal(feed.isValidChannel('alpha'), true);
      assert.equal(feed.isValidChannel('beta'), true);
      assert.equal(feed.isValidChannel('stable'), true);
    });

    it('should return false for a invalid channel', () => {
      assert.equal(feed.isValidChannel('test'), false);
    });
  });

  describe('#getLatestVersion()', () => {
    it('should return the first element of an object', () => {
      const releases = {
        '2023.4.0': {},
        '1967.6.0': {},
        '1967.5.0': {}
      };
      assert.equal(feed.getLatestVersion(releases), '2023.4.0');
    });
  });
});
