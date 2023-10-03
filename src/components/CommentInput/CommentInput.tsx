import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UUID } from 'crypto';

import { State, addComment } from '../../redux/store';

import styles from './CommentInput.module.css';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  subjectId?: UUID;
};

function CommentInput(props: Props): JSX.Element {
  const { open, setOpen, subjectId } = props;
  const [commentText, setCommentText] = useState('');

  const userName = useSelector((state: State) => state.userName);
  const dispatch = useDispatch();

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    if (subjectId) {
      dispatch(
        addComment({
          id: crypto.randomUUID() as UUID,
          subjectId,
          text: commentText,
          userName,
        }),
      );
      setCommentText('');
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <div className={styles.comment_input}>
          <span className={styles.title}>Comment:</span>
          <textarea
            rows={3}
            onKeyDown={(e) =>
              e.key === 'Enter' && !e.shiftKey && handleSubmit()
            }
            className={styles.txt_area}
            value={commentText}
            onChange={(e) => handleInput(e)}
          />
          <div className={styles.btn_block}>
            <button disabled={!commentText} onClick={handleSubmit}>
              Submit
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export { CommentInput };
