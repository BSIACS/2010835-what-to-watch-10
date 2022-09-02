type RatingStarsProps = {
  handleFieldChange : (evt : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  rating : number,
  isDisabled : boolean,
};

export default RatingStarsProps;
