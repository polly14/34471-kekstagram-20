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
// bigPicture.classList.remove('hidden');
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
// document.querySelector('body').classList.add('modal-open');

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var effectsList = document.querySelector('.effects__list');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};
var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  if (textHashtags !== document.activeElement && textDescription !== document.activeElement) {
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
  }
};
uploadFile.addEventListener('change', function () {
  openPopup();
});
uploadFile.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});
uploadCancel.addEventListener('click', function () {
  closePopup();
});
uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var getLevelPin = function () {
  var positionX = effectLevelPin.offsetLeft;
  var lineWidth = effectLevelLine.offsetWidth;
  var percent = Math.round(100 * positionX / lineWidth);
  effectLevelValue.value = percent;
  effectLevelPin.style.left = percent + '%';
  effectLevelDepth.style.width = percent + '%';
  return percent;
};

var getFilterValue = function (filterName, percent) {
  if (filterName === 'none') {
    imgUploadPreview.style.filter = '';
  }
  if (filterName === 'chrome') {
    imgUploadPreview.style.filter = 'grayscale(' + percent / 100 + ')';
  }
  if (filterName === 'sepia') {
    imgUploadPreview.style.filter = 'sepia(' + percent / 100 + ')';
  }
  if (filterName === 'marvin') {
    imgUploadPreview.style.filter = 'invert(' + percent + '%)';
  }
  if (filterName === 'phobos') {
    imgUploadPreview.style.filter = 'blur(' + (percent * 3 / 100) + 'px)';
  }
  if (filterName === 'heat') {
    imgUploadPreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
  }
};

imgUploadEffectLevel.classList.add('hidden');

var filterChange = function (evt) {
  effectLevelValue.value = 100;
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';
  imgUploadPreview.classList = '';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
  if (evt.target.value !== 'none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
  }
};
effectsList.addEventListener('change', filterChange);

var changeFilterValue = function () {
  var current = document.querySelector('.effects__radio:checked');
  getFilterValue(current.value, getLevelPin());
};
effectLevelPin.addEventListener('mouseup', changeFilterValue);

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

scaleControlValue.value = '100%';

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

textDescription.addEventListener('input', function () {
  var MAX_LENGTH = 140;
  var valueLength = textDescription.value.length;
  if (valueLength === MAX_LENGTH) {
    textDescription.setCustomValidity('Вы ввели максимальное количество символов');
  } if (valueLength > MAX_LENGTH) {
    textDescription.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' симв.');
  } else {
    textDescription.setCustomValidity('');
  }
});

var getCheckMessages = function (arr, item) {
  var MIN_LENGTH = 2;
  var MAX_LENGTH = 20;
  var TAGS_AMOUNT = 5;
  var re = /^#[a-zа-яA-ZА-Я0-9]+$/;
  if (item.length < MIN_LENGTH) {
    textHashtags.setCustomValidity('Хэштэг должен содержать не менее 1 символа, начинаться с #');
  } if (item.length > MAX_LENGTH) {
    textHashtags.setCustomValidity('Хэштэг должен содержать не более 20 символов, включая #');
  } if (arr.length > TAGS_AMOUNT) {
    textHashtags.setCustomValidity('Вы можете добавить не более 5 хэштэгов');
  } if (!re.test(item)) {
    textHashtags.setCustomValidity('Хэштэг должен содержать только буквы или цифры, начинаться с #. Пишите хэштэги через пробел.');
  }
  for (var j = 0; j < arr.length - 1; j++) {
    if (item === arr[j]) {
      textHashtags.setCustomValidity('Хэштэги не должны повторяться');
    }
  }
  if (re.test(item)) {
    textHashtags.setCustomValidity('');
  }
};
var checkTags = function () {
  var arrTags = textHashtags.value.split(' ');
  for (i = 0; i < arrTags.length; i++) {
    getCheckMessages(arrTags, arrTags[i]);
  }
};
textHashtags.addEventListener('input', checkTags);
textHashtags.addEventListener('invalid', checkTags);

