/* eslint-env mocha */
'use strict';

const assert = require('assert');
const feed = require('../src/feed');

describe('feed', () => {
  describe('#isValidChannel', () => {
    it('should return true for a valid channel', () => {
      assert.equal(feed.isValidChannel('alpha'), true);
      assert.equal(feed.isValidChannel('beta'), true);
      assert.equal(feed.isValidChannel('stable'), true);
    });

    it('should return false for a invalid channel', () => {
      assert.equal(feed.isValidChannel('test'), false);
    });
  });
});
