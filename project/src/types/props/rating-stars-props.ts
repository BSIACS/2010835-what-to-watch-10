type RatingStarsProps = {
  fieldChangeHandler : (evt : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  rating : number,
  isDisabled : boolean,
};

export default RatingStarsProps;
