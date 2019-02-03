'use strict';

module.exports = {
    
  hasSecurityFixes (release_notes) {
    return ~release_notes.indexOf('Security fixes:');
  },
      
  extractSecurityFixes (release_notes) {
    const lines = release_notes.split('\n');
    let security_fix = [];
  
    for (let i = 0; i < lines.length; i++) {
      if (! lines[i]) {
        break;
      }
      security_fix.push(lines[i]);
    }
      
    return security_fix.join('\n');
  }      
};