'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.img-upload__input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  fileChooser.addEventListener('change', function () {
    preview.src = '';
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    window.matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (window.matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });

      reader.readAsDataURL(file);
      window.openPopup();
    }
  });

  fileChooser.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, function () {
      if (window.matches) {
        window.openPopup();
      }
    });
  });

})();

