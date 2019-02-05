/* eslint-env mocha */
'use strict';

const assert = require('assert');
const rn = require('../src/release-note');

describe('release note', function() {
  describe('#hasSecurityFixes()', function() {
    it('should return true for a security release', function() {
      assert.equal(rn.hasSecurityFixes('Security fixes:\n- foo\n- bar\n\nUpdates:\n- baz\n'), true);
    });

    it('should return false for a non security release', function() {
      assert.equal(rn.hasSecurityFixes('Updates:\n- baz\n'), false);
    });
  });

  describe('#extractSecurityFixes()', function() {
    it('should retrieve only security fixes', function () {
      assert.equal(rn.extractSecurityFixes('Security fixes:\n- foo\n- bar\n\nUpdates:\n- baz\n'), 'Security fixes:\n- foo\n- bar');
    });
  });
});
