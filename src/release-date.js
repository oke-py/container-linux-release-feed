'use strict';

const dayjs = require('dayjs');

module.exports = {

  isIn24Hours (dateString) {
    const yesterday = dayjs().add(-1, 'day');
    return dayjs(dateString).isAfter(yesterday);
  }
};
