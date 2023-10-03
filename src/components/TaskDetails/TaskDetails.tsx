import { ChangeEvent, useState } from 'react';

import { UUID } from 'crypto';

import { useDispatch } from 'react-redux';
import { updateTask } from '../../redux/store';

import timer from '../../assets/icons/timer.svg';
import edit_icon from '../../assets/icons/edit.svg';
import commentIcon from '../../assets/icons/chat.svg';
import check_icon from '../../assets/icons/check.svg';
import start from '../../assets/icons/event_start.svg';

import { SubTask } from '../SubTask/SubTask';
import { CommentInput } from '../CommentInput/CommentInput';
import { CommentsBlock } from '../CommentsBlock/CommentsBlock';

import { Subtask, Task } from '../../redux/types';

import styles from './TaskDetails.module.css';
import { FilesAttached } from '../FilesAttached/FilesAttached';

type Props = {
  task: Task;
  timeAtWork: string;
};

function TaskDetails(props: Props): JSX.Element {
  const { task, timeAtWork } = props;
  const dispatch = useDispatch();
  const [description, setDescription] = useState(task.description);

  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [editTitle, setEditTitle] = useState(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<UUID>();
  const [currentSubTask, setCurrentSubTask] = useState('');

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriority(e.target.value as Task['priority']);
  };

  const handleSubmitChanges = () => {
    dispatch(updateTask({ ...task, title, description, priority }));
  };

  const openComment = () => {
    setCurrentComment(task.id);
    setCommentOpen(!commentOpen);
  };

  const handleAddSubTask = () => {
    const newSubTask: Subtask = {
      text: currentSubTask,
      done: false,
      id: crypto.randomUUID() as UUID,
    };
    dispatch(updateTask({ ...task, subtasks: [...task.subtasks, newSubTask] }));
    setCurrentSubTask('');
  };

  return (
    <div className={styles.task_details} onDrag={(e) => e.preventDefault()}>
      <div className={styles.status}>{task.status}</div>
      {editTitle ? (
        <div>
          <input
            className={styles.title_edit_input}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setEditTitle(false)}
          />
          <img
            src={check_icon}
            alt='checkmark'
            onClick={() => setEditTitle(false)}
            className={styles.icon_edit}
          />
        </div>
      ) : (
        <div className={styles.title_block}>
          <span className={styles.title}>{title}</span>
          <img
            src={edit_icon}
            alt='edit-icon'
            className={styles.icon_edit}
            onClick={() => setEditTitle(true)}
          />
        </div>
      )}
      <div className={styles.task_info}>
        <div className={styles.info}>
          <div className={styles.info_row}>
            <img src={start} alt='start-icon' className={styles.icon} />
            <span>
              {new Date(task.dateCreated).toLocaleDateString('en-UK', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className={styles.info_row}>
            <img src={timer} alt='timer-icon' className={styles.icon} />
            <span>{timeAtWork}</span>
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <input
            className={styles.input}
            type='radio'
            defaultChecked={task.priority === 'low'}
            name='priority'
            id='priority-low'
            value='low'
            onChange={(e) => handleFormChange(e)}
          />
          <label className={styles.label} htmlFor='priority-low'>
            low
          </label>

          <input
            className={styles.input}
            type='radio'
            defaultChecked={task.priority === 'normal'}
            name='priority'
            id='priority-normal'
            value='normal'
            onChange={(e) => handleFormChange(e)}
          />
          <label className={styles.label} htmlFor='priority-normal'>
            NORMAL
          </label>

          <input
            className={styles.input}
            type='radio'
            defaultChecked={task.priority === 'high'}
            name='priority'
            id='priority-high'
            value='high'
            onChange={(e) => handleFormChange(e)}
          />
          <label className={styles.label} htmlFor='priority-high'>
            HIGH
          </label>
        </fieldset>
      </div>

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.description}
      />

      <button
        onClick={handleSubmitChanges}
        className={styles.submit_btn}
        disabled={
          task.priority === priority &&
          task.title === title &&
          task.description === description
        }
      >
        Submit changes
      </button>

      <FilesAttached task={task} />

      <div className={styles.comment_block_header}>
        <span>Commentaries:</span>
      </div>

      <CommentsBlock
        subjectId={task.id}
        setCurrentComment={setCurrentComment}
        setCommentOpen={setCommentOpen}
      />
      <button className={styles.comment_btn} onClick={openComment}>
        <img src={commentIcon} alt='comment-bubble' className={styles.icon} />
        Comment
      </button>
      <CommentInput
        open={commentOpen}
        setOpen={setCommentOpen}
        subjectId={currentComment}
      />

      {task.subtasks && (
        <div className={styles.subtasks}>
          {task.subtasks.map((subtask, idx) => (
            <SubTask key={idx} subtask={subtask} task={task} />
          ))}
          <div className={styles.subtask_input_block}>
            <input
              type='text'
              className={styles.subtask_input}
              value={currentSubTask}
              onChange={(e) => setCurrentSubTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSubTask()}
            />
            <button
              className={styles.subtask_input_btn}
              onClick={handleAddSubTask}
              disabled={currentSubTask === ''}
            >
              Add subtask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { TaskDetails };
