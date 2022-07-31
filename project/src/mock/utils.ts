const getRandomPositiveNumber2 = (min : number, max : number) : number => {
  if(min < 0 || max < 0){
    throw new Error('Аргументы функции не могут быть меньше нуля.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomPositiveNumber2 };
