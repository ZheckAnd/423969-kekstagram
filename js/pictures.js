'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var QUANITY_PHOTO = 25;
var photosUsers = [];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var i = 0;
var j = 0;
var minRandomCommentsLength = 1;
var maxRandomCommentsLength = 2;
var minRandomUserComment = 0;
var maxRandomUserComment = comments.length - 1;

var photoTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var gallery = document.querySelector('.gallery-overlay');


// Рандом;

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива фото;

var getPhotosUsers = function () {
  for (i = 0; i < QUANITY_PHOTO; i++) {
    var randomComments = [];
    randomComments.length = getRandom(minRandomCommentsLength, maxRandomCommentsLength);
    for (j = 0; j < randomComments.length; j++) {
      var randomUserComment = getRandom(minRandomUserComment, maxRandomUserComment);
      randomComments[j] = comments[randomUserComment];
    }

    var numberPhoto = i + 1;
    photosUsers[i] =
      {
        'url': 'photos/' + numberPhoto + '.jpg',
        'likes': getRandom(MIN_LIKES, MAX_LIKES),
        'comments': randomComments
      };
  }
};

// Функция создания DOM-элемента;

var createPicture = function (createElement, source, pictureLikes, pictureComments, photoUser) {
  createElement.querySelector(source).src = photoUser.url;
  createElement.querySelector(pictureLikes).textContent = photoUser.likes;
  createElement.querySelector(pictureComments).textContent = photoUser.comments.length;
};
var getPicture = function (source, pictureLikes, pictureComments, photoUser) {
  var createElement = photoTemplate.cloneNode(true);
  createPicture(createElement, source, pictureLikes, pictureComments, photoUser);
  return createElement;
};

// Создание фрагмета;

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < QUANITY_PHOTO; i++) {
    fragment.appendChild(getPicture('img', '.picture-likes', '.picture-comments', photosUsers[i]));
  }

  pictureList.appendChild(fragment);
};

// Создание галереи

var getGallery = function (clickedPicture) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').src = clickedPicture.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = clickedPicture.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = clickedPicture.querySelector('.picture-comments').textContent;
  return galleryOverlay;
};

getPhotosUsers();
getFragment();

// Новое задание. События;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var clickedPicture;
var pictures = document.querySelectorAll('.picture');
var galleryClose = gallery.querySelector('.gallery-overlay-close');

// Добавление событий при открытии галереи;

var onPictureClick = function () {
  gallery.classList.remove('hidden');
  document.addEventListener('keydown', onPressEsc);
  galleryClose.addEventListener('click', onGalleryCloseClick);
  galleryClose.addEventListener('keydown', onPressEnterClose);
  event.preventDefault();
  clickedPicture = event.currentTarget;
  getGallery(clickedPicture);
};

var onPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onGalleryCloseClick();
  }
};

var onPressEnterClose = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onGalleryCloseClick();
  }
};

// Удаление событий при закрытии галереи;

var onGalleryCloseClick = function () {
  gallery.classList.add('hidden');
  document.removeEventListener('keydown', onPressEsc);
  galleryClose.removeEventListener('click', onGalleryCloseClick);
  galleryClose.removeEventListener('keydown', onPressEnterClose);
};

// Добавление слушателей на фото;

var getPictureListener = function () {
  for (i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', onPictureClick);
    pictures[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onPictureClick();
      }
    });
  }
};

getPictureListener();
