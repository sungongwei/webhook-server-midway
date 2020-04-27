'use strict';

module.exports = pandora => {
  pandora
    .fork('[your app name]', require.resolve('midway/server'));
};
