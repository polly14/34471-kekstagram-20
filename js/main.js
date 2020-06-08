'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var picturesWrapper = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
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
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
var getRandomArrWithoutRepeat = function (min, max) {
  var arr = [];
  for (var j = min; j <= max; j++) {
    arr.push(j);
  }
  shuffle(arr);
  return arr;
};
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
        var numMessages = getRandomArrWithoutRepeat(0, messages.length - 1);
        comment.avatar = 'img/avatar-' + numAvatar + '.svg';
        comment.message = messages[numMessages[0]] + ' ' + messages[numMessages[1]];
        comment.name = name;
        return comment;
      };
      var num = getRandomNumber(0, 10);
      for (var i = 0; i < num; i++) {
        var numAvatar = getRandomNumber(1, 6);
        var numName = getRandomNumber(0, NAMES.length - 1);
        comments.push(getComment(numAvatar, MESSAGES, NAMES[numName]));
      }
      return comments;
    }();
    return picture;
  };
  var numPhotos = getRandomArrWithoutRepeat(1, 25);
  for (var i = 0; i < 25; i++) {
    var numLikes = getRandomNumber(15, 200);
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

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').src = arrRenderPictures[0].url;
bigPicture.querySelector('.likes-count').textContent = arrRenderPictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = arrRenderPictures[0].comments.length;
var socialCommentsWrapper = bigPicture.querySelector('.social__comments');
var socialComment = bigPicture.querySelectorAll('.social__comment');
for (var c = 0; c < socialComment.length; c++) {
  socialCommentsWrapper.removeChild(socialComment[c]);
}
for (c = 0; c < arrRenderPictures[0].comments.length; c++) {
  var comment = document.createElement('li');
  comment.className = 'social__comment';
  comment.innerHTML = '<img width="35" height="35" class="social__picture" > <p class="social__text"></p>';
  comment.querySelector('.social__picture').src = arrRenderPictures[0].comments[c].avatar;
  comment.querySelector('.social__picture').alt = arrRenderPictures[0].comments[c].name;
  comment.querySelector('.social__text').textContent = arrRenderPictures[0].comments[c].message;
  fragment.appendChild(comment);
}
socialCommentsWrapper.appendChild(fragment);
bigPicture.querySelector('.social__caption').textContent = arrRenderPictures[0].description;
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
