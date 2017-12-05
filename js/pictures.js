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
var photoTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
// Рандом;
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var i = 0;
var j = 0;
var minRandomCommentsLength = 1;
var maxRandomCommentsLength = 2;
var minRandomUserComment = 0;
var maxRandomUserComment = comments.length - 1;
// Создание массива фото;
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
      'comments': randomComments.length
    };
}

// Функция создания DOM-элемента;
var makePicture = function (photoUser) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photoUser.url;
  photoElement.querySelector('.picture-likes').textContent = photoUser.likes;
  photoElement.querySelector('.picture-comments').textContent = photoUser.comments;
  return photoElement;
};
// Создание фрагмета;
var fragment = document.createDocumentFragment();
for (i = 0; i < QUANITY_PHOTO; i++) {
  fragment.appendChild(makePicture(photosUsers[i]));
}
// Вставка фрагмента;
pictureList.appendChild(fragment);

var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');
gallery.querySelector('.gallery-overlay-image').src = photosUsers[0].url;
gallery.querySelector('.likes-count').textContent = photosUsers[0].likes;
gallery.querySelector('.comments-count').textContent = photosUsers[0].comments;
