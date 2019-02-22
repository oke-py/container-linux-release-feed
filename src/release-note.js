'use strict';

module.exports = {

  hasSecurityFixes (releaseNotes) {
    return releaseNotes.indexOf('Security fixes:') !== -1;
  },

  extractSecurityFixes (releaseNotes) {
    const lines = releaseNotes.split('\n');
    let securityFix = [];

    for (let i = 0; i < lines.length; i++) {
      if (! lines[i]) {
        break;
      }
      securityFix.push(lines[i]);
    }

    return securityFix.join('\n');
  },

  replaceLinkFormat (mdLink) {
    return mdLink.replace(/\[([A-Z0-9-]+)\]\(([^)]+)\)/g, '<$2|$1>');
  }
};
