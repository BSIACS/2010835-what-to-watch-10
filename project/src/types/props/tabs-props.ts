import Comment from '../comment';
import Film from '../film';

type TabsProps = {
  film : Film | undefined,
  comments: Comment[],
}

export default TabsProps;
