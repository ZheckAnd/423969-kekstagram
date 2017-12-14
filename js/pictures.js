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

var getGallery = function (source, pictureLikes, pictureComments, photoUser) {
  // gallery.classList.remove('hidden');
  var createElement = document.querySelector('.gallery-overlay');
  createPicture(createElement, source, pictureLikes, pictureComments, photoUser);
  return createElement;
};

getPhotosUsers();
getFragment();

// Новое задание;
var clickedPicture;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onGalleryCloseClick();
  }
};
var picture = document.querySelector('.picture'); // вот так работает а если выбрать все селектора то нет.
var galleryClose = gallery.querySelector('.gallery-overlay-close');

var onPressEnterClose = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onGalleryCloseClick();
  }
};

var onPictureClick = function () {
  gallery.classList.remove('hidden');
  document.addEventListener('keydown', onPressEsc);
  galleryClose.addEventListener('click', onGalleryCloseClick);
  galleryClose.addEventListener('keydown', onPressEnterClose);
  event.preventDefault();
  clickedPicture = event.currentTarget;
  console.log(clickedPicture);
};

var onGalleryCloseClick = function () {
  gallery.classList.add('hidden');
  galleryClose.removeEventListener('click', onGalleryCloseClick);
  galleryClose.removeEventListener('keydown', onPressEnterClose);

};
picture.addEventListener('click', onPictureClick);
picture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPictureClick();
  }
});
getGallery('.gallery-overlay-image', '.likes-count', '.comments-count', photosUsers[0]);
