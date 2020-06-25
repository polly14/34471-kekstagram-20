'use strict';
(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var successWrap = successTemplate.cloneNode(true);
  var errorWrap = errorTemplate.cloneNode(true);

  var removeMessage = function (wrap) {
    if (main.contains(wrap)) {
      main.removeChild(wrap);
    }
    document.removeEventListener('keydown', window.onPopupEscPress);
  };

  var deleteMessage = function (wrap) {
    window.onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        removeMessage(wrap);
      });
    };
    wrap.addEventListener('click', function (evt) {
      if (evt.target === wrap || evt.target === wrap.querySelector('button')) {
        removeMessage(wrap);

      }
    });
  };

  window.messages = {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '20px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    openSuccessMessage: function () {
      main.appendChild(successWrap);
      deleteMessage(successWrap);
      document.addEventListener('keydown', window.onPopupEscPress);
    },
    openErrorMessage: function () {
      main.appendChild(errorWrap);
      deleteMessage(errorWrap);
      document.addEventListener('keydown', window.onPopupEscPress);
    }
  };
})();
