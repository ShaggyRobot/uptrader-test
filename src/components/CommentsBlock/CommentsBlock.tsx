import { UUID } from 'crypto';
import styles from './CommentsBlock.module.css';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { CommentComponent } from '../CommetComponent/CommentComponent';

type Props = {
  subjectId: UUID;
  setCurrentComment: (commentId: UUID) => void;
  setCommentOpen: (open: boolean) => void;
};

function CommentsBlock(props: Props): JSX.Element {
  const { subjectId, setCurrentComment, setCommentOpen } = props;
  const comments = useSelector((state: State) => state.comments);
  const subjectComments = comments.filter(
    (comment) => comment.subjectId === subjectId,
  );

  return (
    <div className={styles.comments_block}>
      {subjectComments &&
        subjectComments.map((comment) => {
          return (
            <CommentComponent
              key={comment.id}
              comment={comment}
              setCurrentComment={setCurrentComment}
              setCommentOpen={setCommentOpen}
            />
          );
        })}
    </div>
  );
}

export { CommentsBlock };
