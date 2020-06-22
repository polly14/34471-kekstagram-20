'use strict';
(function () {
  var picturesWrapper = document.querySelector('.pictures');
  var socialFooterText = document.querySelector('.social__footer-text');
  var pictureCancel = document.querySelector('#picture-cancel');
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentsWrapper = bigPicture.querySelector('.social__comments');
  var thumbPictures = picturesWrapper.querySelectorAll('.picture img');
  var fragment = document.createDocumentFragment();
  var renderBigPicture = function (current) {
    var getIndexOfPic = function () {
      for (var n = 0; n < thumbPictures.length; n++) {
        if (current === thumbPictures[n]) {
          var numberOfPic = n;
        }
      }
      return numberOfPic;
    };
    var numberOfPic = getIndexOfPic();
    bigPicture.querySelector('.big-picture__img img').src = window.gallery.arrRenderPictures[numberOfPic].url;
    bigPicture.querySelector('.likes-count').textContent = window.gallery.arrRenderPictures[numberOfPic].likes;
    bigPicture.querySelector('.comments-count').textContent = window.gallery.arrRenderPictures[numberOfPic].comments.length;
    socialCommentsWrapper.innerHTML = '';
    for (var c = 0; c < window.gallery.arrRenderPictures[numberOfPic].comments.length; c++) {
      var comment = document.createElement('li');
      comment.className = 'social__comment';
      comment.innerHTML = '<img width="35" height="35" class="social__picture" > <p class="social__text"></p>';
      comment.querySelector('.social__picture').src = window.gallery.arrRenderPictures[numberOfPic].comments[c].avatar;
      comment.querySelector('.social__picture').alt = window.gallery.arrRenderPictures[numberOfPic].comments[c].name;
      comment.querySelector('.social__text').textContent = window.gallery.arrRenderPictures[numberOfPic].comments[c].message;
      fragment.appendChild(comment);
    }
    socialCommentsWrapper.appendChild(fragment);
    bigPicture.querySelector('.social__caption').textContent = window.gallery.arrRenderPictures[numberOfPic].description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  };

  var onPicturePopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePicture);
  };
  var openPicture = function (current) {
    renderBigPicture(current);
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPicturePopupEscPress);
  };
  var closePicture = function () {
    if (socialFooterText !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onPicturePopupEscPress);
    }
  };
  picturesWrapper.addEventListener('click', function (current) {
    if (current.target && current.target.matches('.picture img')) {
      openPicture(current.target);
    }
  });

  picturesWrapper.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, function () {
      if (evt.target && evt.target.matches('.picture')) {
        var target = evt.target.querySelector('img');
        openPicture(target);
      }
    });
  });
  pictureCancel.addEventListener('click', function () {
    closePicture();
  });
  pictureCancel.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePicture);
  });

  socialFooterText.addEventListener('input', function () {
    var MAX_LENGTH = 140;
    var valueLength = socialFooterText.value.length;
    if (valueLength === MAX_LENGTH) {
      socialFooterText.setCustomValidity('Вы ввели максимальное количество символов');
    } if (valueLength > MAX_LENGTH) {
      socialFooterText.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' симв.');
    } else {
      socialFooterText.setCustomValidity('');
    }
  });
})();
