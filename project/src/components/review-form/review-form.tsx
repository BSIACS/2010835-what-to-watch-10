import { FormEvent, Fragment, useEffect, useState } from 'react';
import ReviewFormProps from '../../types/props/review-form-props';
import { lightenDarkenColor } from '../../utils';
import ReviewFormData from '../../types/review-form-data';
import { AppLink, ColorCoefficient, FilmRatingSettings, RequestStatus, ReviewTextLength} from '../../constants';
import RatingStars from '../rating-stars/rating-stars';
import { store } from '../../store';
import { sendNewCommentAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';


function ReviewForm({film} : ReviewFormProps) : JSX.Element{
  const filmId = film ? film.id : 0;
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({rating: FilmRatingSettings.DefaultFilmRating, reviewText: ''});
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isErrorMessageDisplayed, setIsErrorMessageDisplayed] = useState(false);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.READY);
  const navigate = useNavigate();

  useEffect(() => {
    if(reviewFormData.rating > 0 && reviewFormData.reviewText.length >= ReviewTextLength.MinReviewTextLength && reviewFormData.reviewText.length <= ReviewTextLength.MaxReviewTextLength){
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

  const handleFieldChange = (evt : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;

    if(target instanceof HTMLTextAreaElement){
      setReviewFormData({...reviewFormData, reviewText: target.value});
    }
    else if(target instanceof HTMLInputElement){
      setReviewFormData({...reviewFormData, rating: +target.value});
    }
  };

  const handleFormSubmit = (evt : FormEvent<HTMLFormElement>) => {
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
        <form action="#" className="add-review__htmlForm" onSubmit={handleFormSubmit}>

          <RatingStars handleFieldChange={handleFieldChange} rating={reviewFormData.rating} isDisabled={isFormDisabled}/>

          <div className="add-review__text" style={{backgroundColor: lightenDarkenColor(film?.backgroundColor, ColorCoefficient.LightenCoefficient)}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewFormData.reviewText} onChange={handleFieldChange} disabled={isFormDisabled}></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" style={{color: lightenDarkenColor(film?.backgroundColor, ColorCoefficient.DarkenCoefficient)}} disabled={isPostButtonDisabled || isFormDisabled}>Post</button>
            </div>
          </div>
        </form>
        <div className={`error_message ${isErrorMessageDisplayed ? '' : 'error_message_hidden'}`}>Ошибка при отправке данных на сервер</div>
      </div>
    </Fragment>
  );
}

export default ReviewForm;
