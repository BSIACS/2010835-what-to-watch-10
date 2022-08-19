import { RequestStatus } from '../../constants';
import NewComment from '../new-comment';

type SendNewCommentArgs = {
  id : number,
  newComment : NewComment,
  handleRequestStatusChanged : (requestStatus : RequestStatus) => void,
}

export default SendNewCommentArgs;
