'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var shuffle = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    unique: function (arr) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
          result.push(arr[i]);
        }
      }
      return result;
    },
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    getRandomArrWithoutRepeat: function (min, max) {
      var arr = [];
      for (var j = min; j <= max; j++) {
        arr.push(j);
      }
      shuffle(arr);
      return arr;
    }
  };
})();
