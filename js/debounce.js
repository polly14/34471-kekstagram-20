'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 5000;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
