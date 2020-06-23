'use strict';
(function () {
  var picturesWrapper = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentsWrapper = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  var renderPicture = function (objRenderPictures) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = objRenderPictures.url;
    pictureElement.querySelector('.picture__likes').textContent = objRenderPictures.likes;
    pictureElement.querySelector('.picture__comments').textContent = objRenderPictures.comments.length;
    return pictureElement;
  };

  var renderGallery = function (pictures) {
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesWrapper.appendChild(fragment);
  };

  window.backend.load(function (response) {
    renderGallery(response);

    window.renderBigPicture = function (numberOfPic) {
      bigPicture.querySelector('.big-picture__img img').src = response[numberOfPic].url;
      bigPicture.querySelector('.likes-count').textContent = response[numberOfPic].likes;
      bigPicture.querySelector('.comments-count').textContent = response[numberOfPic].comments.length;
      socialCommentsWrapper.innerHTML = '';
      for (var c = 0; c < response[numberOfPic].comments.length; c++) {
        var comment = document.createElement('li');
        comment.className = 'social__comment';
        comment.innerHTML = '<img width="35" height="35" class="social__picture" > <p class="social__text"></p>';
        comment.querySelector('.social__picture').src = response[numberOfPic].comments[c].avatar;
        comment.querySelector('.social__picture').alt = response[numberOfPic].comments[c].name;
        comment.querySelector('.social__text').textContent = response[numberOfPic].comments[c].message;
        fragment.appendChild(comment);
      }
      socialCommentsWrapper.appendChild(fragment);
      bigPicture.querySelector('.social__caption').textContent = response[numberOfPic].description;
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    };

  }, window.backend.errorHandler);

})();
