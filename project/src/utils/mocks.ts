import Film from '../types/film';
import { UserData } from '../types/user-data';

export const makeFakeFilmsArray = () : Film[] => [
  {
    name: 'Snatch',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
    backgroundColor: '#FDFDFC',
    description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    rating: 0.2,
    scoresCount: 716577,
    director: 'Guy Ritchie',
    starring: [
      'Jason Statham',
      'Brad Pitt',
      'Benicio Del Toro'
    ],
    runTime: 104,
    genre: 'Comedy',
    released: 2000,
    id: 1,
    isFavorite: true,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    name :  'Gangs of new york' ,
    posterImage :  'https://10.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg',
    previewImage :  'https://10.react.pages.academy/static/film/preview/gangs_of_new_york.jpg',
    backgroundImage :  'https://10.react.pages.academy/static/film/background/gangs_of_new_york.jpg',
    backgroundColor :  '#A6B7AC',
    description :  'In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father\'s killer.',
    rating : 8.8,
    scoresCount : 370881,
    director :  'Martin Scorsese',
    starring : [
      'Leonardo DiCaprio',
      'Cameron Diaz',
      'Daniel Day-Lewis'
    ],
    runTime : 167,
    genre :  'Crime' ,
    released : 2002,
    id : 2,
    isFavorite : false,
    videoLink :  'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink :  'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
];

export const makeFakeFilm = () : Film => (
  {
    name: 'Snatch',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
    backgroundColor: '#FDFDFC',
    description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    rating: 0.2,
    scoresCount: 716577,
    director: 'Guy Ritchie',
    starring: [
      'Jason Statham',
      'Brad Pitt',
      'Benicio Del Toro'
    ],
    runTime: 104,
    genre: 'Comedy',
    released: 2000,
    id: 1,
    isFavorite: true,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  }
);

export const makeFakeUserData = () : UserData => ({
  'avatarUrl': 'img/1.png',
  'email': 'Oliver.conner@gmail.com',
  'id': 1,
  'name': 'Oliver.conner',
  'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
});

export const makeFakeComment = () => ({
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.',
  rating: 8,
});
