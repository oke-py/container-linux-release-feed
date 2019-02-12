/* eslint-env mocha */
'use strict';

const assert = require('assert');
const rn = require('../src/release-note');

describe('release note', () => {
  describe('#hasSecurityFixes()', () => {
    it('should return true for a security release', () => {
      assert.equal(rn.hasSecurityFixes('Security fixes:\n- foo\n- bar\n\nUpdates:\n- baz\n'), true);
    });

    it('should return false for a non security release', () => {
      assert.equal(rn.hasSecurityFixes('Updates:\n- baz\n'), false);
    });
  });

  describe('#extractSecurityFixes()', () => {
    it('should retrieve only security fixes', () => {
      assert.equal(rn.extractSecurityFixes('Security fixes:\n- foo\n- bar\n\nUpdates:\n- baz\n'), 'Security fixes:\n- foo\n- bar');
    });
  });

  describe('#replaceLinkFormat()', () => {
    it('should replace markdown link to slack link', () => {
      assert.equal(rn.replaceLinkFormat('([CVE-2019-6486](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6486))'), '(<https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6486|CVE-2019-6486>)');
    });
  });
});
