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
var getRandomArrWithoutRepeat = function (min, max) {
  var arr = [];
  for (var j = min; j <= max; j++) {
    arr.push(j);
  }
  shuffle(arr);
  return arr;
};
var getArr = function () {
  var arr = [];
  var getObj = function (j, l) {
    var obj = {};
    obj.url = 'photos/' + j + '.jpg';
    obj.description = '';
    obj.likes = l;
    obj.comments = function () {
      var arrComments = [];
      var getCommentsObj = function (a, m, m2, n) {
        var CommentsObj = {};
        CommentsObj.avatar = 'img/avatar-' + a + '.svg';
        CommentsObj.message = m + ' ' + m2;
        CommentsObj.name = n;
        return CommentsObj;
      };
      var num = Math.random().toFixed(1) * 10;
      for (var i = 0; i < num; i++) {
        var arrAvatar = getRandomArrWithoutRepeat(1, 6);
        var arrMessage = getRandomArrWithoutRepeat(0, MESSAGES.length - 1);
        var arrName = getRandomArrWithoutRepeat(0, NAMES.length - 1);
        arrComments.push(getCommentsObj(arrAvatar[0], MESSAGES[arrMessage[0]], MESSAGES[arrMessage[1]], NAMES[arrName[0]]));
      }
      return arrComments;
    }();
    return obj;
  };
  var arrPhotos = getRandomArrWithoutRepeat(1, 25);
  var arrLikes = getRandomArrWithoutRepeat(15, 200);
  for (var i = 0; i < 25; i++) {
    arr.push(getObj(arrPhotos[i], arrLikes[i]));
  }
  return arr;
};
var renderPicture = function (obj) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = obj.url;
  pictureElement.querySelector('.picture__likes').textContent = obj.likes;
  pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;
  return pictureElement;
};
var fragment = document.createDocumentFragment();
var pArr = getArr();
for (var i = 0; i < 25; i++) {
  fragment.appendChild(renderPicture(pArr[i]));
}
picturesWrapper.appendChild(fragment);
