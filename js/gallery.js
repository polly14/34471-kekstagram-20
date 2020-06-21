'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var picturesWrapper = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var getPictures = function () {
    var pictures = [];
    var getPicture = function (numJpg, numLikes) {
      var picture = {};
      picture.url = 'photos/' + numJpg + '.jpg';
      picture.description = '';
      picture.likes = numLikes;
      picture.comments = function () {
        var comments = [];
        var getComment = function (numAvatar, messages, name) {
          var comment = {};
          var numMessages = window.utils.getRandomArrWithoutRepeat(0, messages.length - 1);
          comment.avatar = 'img/avatar-' + numAvatar + '.svg';
          comment.message = messages[numMessages[0]] + ' ' + messages[numMessages[1]];
          comment.name = name;
          return comment;
        };
        var num = window.utils.getRandomNumber(0, 10);
        for (var i = 0; i < num; i++) {
          var numAvatar = window.utils.getRandomNumber(1, 6);
          var numName = window.utils.getRandomNumber(0, NAMES.length - 1);
          comments.push(getComment(numAvatar, MESSAGES, NAMES[numName]));
        }
        return comments;
      }();
      return picture;
    };
    var numPhotos = window.utils.getRandomArrWithoutRepeat(1, 25);
    for (var i = 0; i < 25; i++) {
      var numLikes = window.utils.getRandomNumber(15, 200);
      pictures.push(getPicture(numPhotos[i], numLikes));
    }
    return pictures;
  };
  var renderPicture = function (objRenderPictures) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = objRenderPictures.url;
    pictureElement.querySelector('.picture__likes').textContent = objRenderPictures.likes;
    pictureElement.querySelector('.picture__comments').textContent = objRenderPictures.comments.length;
    return pictureElement;
  };
  var fragment = document.createDocumentFragment();
  var arrRenderPictures = getPictures();
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(renderPicture(arrRenderPictures[i]));
  }
  picturesWrapper.appendChild(fragment);

  window.gallery = {
    arrRenderPictures: arrRenderPictures
  };
})();
