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
  var arrPictures = [];
  var getObjPictures = function (numJpg, numLikes) {
    var objPictures = {};
    objPictures.url = 'photos/' + numJpg + '.jpg';
    objPictures.description = '';
    objPictures.likes = numLikes;
    objPictures.comments = function () {
      var arrComments = [];
      var getObjComments = function (numAvatar, messages, name) {
        var objComments = {};
        var arrNumMessages = getRandomArrWithoutRepeat(0, messages.length - 1);
        objComments.avatar = 'img/avatar-' + numAvatar + '.svg';
        objComments.message = messages[arrNumMessages[0]] + ' ' + messages[arrNumMessages[1]];
        objComments.name = name;
        return objComments;
      };
      var num = getRandomNumber(0, 10);
      for (var i = 0; i < num; i++) {
        var numAvatar = getRandomNumber(1, 6);
        var numName = getRandomNumber(0, NAMES.length - 1);
        arrComments.push(getObjComments(numAvatar, MESSAGES, NAMES[numName]));
      }
      return arrComments;
    }();
    return objPictures;
  };
  var arrNumPhotos = getRandomArrWithoutRepeat(1, 25);
  for (var i = 0; i < 25; i++) {
    var numLikes = getRandomNumber(15, 200);
    arrPictures.push(getObjPictures(arrNumPhotos[i], numLikes));
  }
  return arrPictures;
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
