type RatingStarProps = {
  fieldChangeHandler : (evt : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  elementNumber : number,
  rating : number,
  isDisabled : boolean,
};

export default RatingStarProps;
