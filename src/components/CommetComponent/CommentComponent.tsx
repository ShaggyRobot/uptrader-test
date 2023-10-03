import { UUID } from 'crypto';
import { useSelector } from 'react-redux';

import { State } from '../../redux/store';
import { CommentType } from '../../redux/types';

import styles from './CommentComponent.module.css';

import replyIcon from '../../assets/icons/reply.svg';

type Props = {
  comment: CommentType;
  setCurrentComment: (commentId: UUID) => void;
  setCommentOpen: (open: boolean) => void;
};

function CommentComponent(props: Props): JSX.Element {
  const { comment, setCurrentComment, setCommentOpen } = props;
  const comments = useSelector((state: State) => state.comments);

  const childrenComments = comments.filter(
    (child) => child.subjectId === comment.id,
  );

  const handleClick = () => {
    setCurrentComment(comment.id);
    setCommentOpen(true);
  };

  return (
    <div
      className={`${styles.comment_component} ${
        !childrenComments.length ? styles.no_guide : ''
      }`}
    >
      <div className={styles.comment_content}>
        <div className={styles.comment_details}>
          {comment.userName}
          <img
            src={replyIcon}
            alt='reply-icon'
            className={styles.icon}
            onClick={handleClick}
          />
        </div>
        <div className={styles.comment_text}>{comment.text}</div>
      </div>
      {childrenComments &&
        childrenComments.map((comment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            setCurrentComment={setCurrentComment}
            setCommentOpen={setCommentOpen}
          />
        ))}
    </div>
  );
}

export { CommentComponent };
