import { FormEvent, Fragment, useEffect, useState } from 'react';
import ReviewFormProps from '../../types/props/review-form-props';
import { lightenDarkenColor } from '../../utils';
import ReviewFormData from '../../types/review-form-data';
import { AppLink, DARKEN_COEFFICIENT, DEFAULT_FILM_RATING, LIGHTEN_COEFFICIENT, MAX_REVIEW_TEXT_LENGTH, MIN_REVIEW_TEXT_LENGTH, RequestStatus} from '../../constants';
import RatingStars from '../rating-stars/rating-stars';
import { store } from '../../store';
import { sendNewCommentAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';


function ReviewForm({film} : ReviewFormProps) : JSX.Element{
  const filmId = film ? film.id : 0;
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({rating: DEFAULT_FILM_RATING, reviewText: ''});
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isErrorMessageDisplayed, setIsErrorMessageDisplayed] = useState(false);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.READY);
  const navigate = useNavigate();

  useEffect(() => {
    if(reviewFormData.rating > 0 && reviewFormData.reviewText.length >= MIN_REVIEW_TEXT_LENGTH && reviewFormData.reviewText.length <= MAX_REVIEW_TEXT_LENGTH){
      setIsPostButtonDisabled(false);
    }
    else{
      setIsPostButtonDisabled(true);
    }
  }, [reviewFormData]);


  useEffect(() => {
    switch (requestStatus) {
      case RequestStatus.ERROR: setIsFormDisabled(false); setRequestStatus(RequestStatus.READY); setIsErrorMessageDisplayed(true);
        break;
      case RequestStatus.SUCCESS: navigate(`/${AppLink.Films}/${filmId}`);
        break;
    }
  }, [filmId, navigate, requestStatus]);

  const handleRequestStatusChanged = (status : RequestStatus) => {
    setRequestStatus(status);
  };

  const fieldChangeHandler = (evt : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;

    if(target instanceof HTMLTextAreaElement){
      setReviewFormData({...reviewFormData, reviewText: target.value});
    }
    else if(target instanceof HTMLInputElement){
      setReviewFormData({...reviewFormData, rating: +target.value});
    }
  };

  const formSubmitHandler = (evt : FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    store.dispatch(sendNewCommentAction({id: filmId, newComment: {comment: reviewFormData.reviewText, rating: reviewFormData.rating}, handleRequestStatusChanged: handleRequestStatusChanged}));
  };

  return (
    <Fragment>
      <style>
        {`
          .error_message {
            color: red;
          }
          .error_message_hidden {
            display: none;
          }
        `}
      </style>
      <div className="add-review">
        <form action="#" className="add-review__htmlForm" onSubmit={formSubmitHandler}>

          <RatingStars fieldChangeHandler={fieldChangeHandler} rating={reviewFormData.rating} isDisabled={isFormDisabled}/>

          <div className="add-review__text" style={{backgroundColor: lightenDarkenColor(film?.backgroundColor, LIGHTEN_COEFFICIENT)}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewFormData.reviewText} onChange={fieldChangeHandler} disabled={isFormDisabled}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" style={{color: lightenDarkenColor(film?.backgroundColor, DARKEN_COEFFICIENT)}} disabled={isPostButtonDisabled || isFormDisabled}>Post</button>
            </div>
          </div>
        </form>
        <div className={`error_message ${isErrorMessageDisplayed ? '' : 'error_message_hidden'}`}>Ошибка при отправке данных на сервер</div>
      </div>
    </Fragment>
  );
}

export default ReviewForm;
