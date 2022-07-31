import RatingLevel from './types/rating-level';

const lightenDarkenColor = (col : string | undefined, amt : number) => {
  if(col === undefined){
    return '#00000';
  }

  let usePound = false;
  if ( col[0] === '#' ) {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col,16);

  let red = (num >> 16) + amt;

  if ( red > 255 ){
    red = 255;
  }
  else if(red < 0){
    red = 0;
  }

  let blue = ((num >> 8) & 0x00FF) + amt;

  if ( blue > 255 ){
    blue = 255;
  }
  else if(blue < 0){
    blue = 0;
  }

  let green = (num & 0x0000FF) + amt;

  if ( green > 255 ){
    green = 255;
  }
  else if( green < 0 ){
    green = 0;
  }

  return (usePound ? '#' : '') + (green | (blue << 8) | (red << 16)).toString(16);
};

const getRatingLevel = (ratingScore : number) => {
  if(ratingScore < 3){
    return RatingLevel.BAD;
  }
  else if(ratingScore >= 3 && ratingScore < 5){
    return RatingLevel.NORMAL;
  }
  else if(ratingScore >= 5 && ratingScore < 8){
    return RatingLevel.GOOD;
  }
  else if(ratingScore >= 8 && ratingScore < 10){
    return RatingLevel.VERYGOOD;
  }
  else{
    return RatingLevel.AWESOME;
  }

};

const getRandomPositiveNumber = (min : number, max : number) : number => {
  if(min < 0 || max < 0){
    throw new Error('Аргументы функции не могут быть меньше нуля.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqueRandomNumbers = (min : number, max : number, quantity : number) : number[] => {
  const result : number[] = [];

  while(result.length < quantity){
    const randomNumber = getRandomPositiveNumber(min, max);

    if(!result.includes(randomNumber)){
      result.push(randomNumber);
    }
  }

  return result;
};

const getFilmRunTime = (duration : number | undefined) => {
  if(duration === undefined){
    return;
  }

  const hours = Math.trunc(duration / 60) > 0 ? `${Math.trunc(duration / 60)}h` : '';
  const minutes = duration % 60 > 0 ? `${duration % 60}m` : '';

  return `${hours} ${minutes}`;
};

export {lightenDarkenColor, getRatingLevel, getRandomPositiveNumber, getUniqueRandomNumbers, getFilmRunTime};
