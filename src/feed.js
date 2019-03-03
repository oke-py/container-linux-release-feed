'use strict';

module.exports = {

  isValidChannel (channel) {
    return ['stable', 'beta', 'alpha'].includes(channel);
  },

  getLatestVersion (releases) {
    for (let latest in releases) {
      return latest;
    }
  }
};
