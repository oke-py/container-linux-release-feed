'use strict';

module.exports = {

  isValidChannel (channel) {
    return ['stable', 'beta', 'alpha'].includes(channel);
  }
};
