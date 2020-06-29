'use strict';
(function () {
  var picturesWrapper = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentsWrapper = bigPicture.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();
  var imgFilters = document.querySelector('.img-filters');
  var pictures = [];
  var amount = 25;
  var renderPicture = function (objRenderPictures) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = objRenderPictures.url;
    pictureElement.querySelector('.picture__likes').textContent = objRenderPictures.likes;
    pictureElement.querySelector('.picture__comments').textContent = objRenderPictures.comments.length;
    return pictureElement;
  };

  window.renderGallery = function (response) {
    var previousPictures = picturesWrapper.querySelectorAll('a.picture');
    for (var j = 0; j < previousPictures.length; j++) {
      picturesWrapper.removeChild(previousPictures[j]);
    }
    for (var i = 0; i < amount; i++) {
      fragment.appendChild(renderPicture(response[i]));
    }
    picturesWrapper.appendChild(fragment);
  };

  window.backend.load(function (response) {
    pictures = response;
    window.renderGallery(pictures);

    window.filteredGallery = {
      onDefault: window.debounce(function () {
        pictures = [];
        amount = 25;
        pictures = response;
        window.renderGallery(pictures);
      }),
      onRandom: window.debounce(function () {
        pictures = [];
        amount = 10;
        var numbers = window.utils.getRandomArrWithoutRepeat(0, response.length - 1);
        for (var n = 0; n < numbers.length; n++) {
          pictures.push(response[numbers[n]]);
        }
        window.renderGallery(pictures);
      }),
      onDiscussed: window.debounce(function () {
        pictures = [];
        amount = 25;
        pictures = response.slice();
        pictures = window.getDiscussed(pictures).reverse();
        window.renderGallery(pictures);
      }),
      renderBigPicture: function (numberOfPic) {
        bigPicture.querySelector('.big-picture__img img').src = pictures[numberOfPic].url;
        bigPicture.querySelector('.likes-count').textContent = pictures[numberOfPic].likes;
        bigPicture.querySelector('.comments-count').textContent = pictures[numberOfPic].comments.length;
        socialCommentsWrapper.innerHTML = '';
        for (var c = 0; c < pictures[numberOfPic].comments.length; c++) {
          var comment = document.createElement('li');
          comment.className = 'social__comment';
          comment.innerHTML = '<img width="35" height="35" class="social__picture" > <p class="social__text"></p>';
          comment.querySelector('.social__picture').src = pictures[numberOfPic].comments[c].avatar;
          comment.querySelector('.social__picture').alt = pictures[numberOfPic].comments[c].name;
          comment.querySelector('.social__text').textContent = pictures[numberOfPic].comments[c].message;
          fragment.appendChild(comment);
        }
        socialCommentsWrapper.appendChild(fragment);
        bigPicture.querySelector('.social__caption').textContent = pictures[numberOfPic].description;
        bigPicture.querySelector('.social__comment-count').classList.add('hidden');
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
      }
    };
    imgFilters.classList.remove('img-filters--inactive');

  }, window.messages.errorHandler);

})();
