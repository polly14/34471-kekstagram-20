'use strict';
(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleImageSmaller = function () {
    var step = 25;
    var str = scaleControlValue.value;
    var value = parseInt(str.slice(0, -1), 10);
    value -= step;
    if (value <= step) {
      value = step;
    }
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    value = value + '%';
    scaleControlValue.value = value;
  };

  var scaleImageBigger = function () {
    var step = 25;
    var str = scaleControlValue.value;
    var value = parseInt(str.slice(0, -1), 10);
    value += step;
    if (value >= 100) {
      value = 100;
    }
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
    value = value + '%';
    scaleControlValue.value = value;
  };
  scaleControlSmaller.addEventListener('click', scaleImageSmaller);
  scaleControlBigger.addEventListener('click', scaleImageBigger);
})();
