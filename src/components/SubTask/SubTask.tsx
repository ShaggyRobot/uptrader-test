import { Subtask, Task } from '../../redux/types';
import styles from './SubTask.module.css';

import deleteIcon from '../../assets/icons/backspace.svg';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../redux/store';

type Props = {
  subtask: Subtask;
  task: Task;
};

function SubTask(props: Props): JSX.Element {
  const { subtask, task } = props;
  const dispatch = useDispatch();

  const handleChecked = () => {
    const newSubTasks = task.subtasks.map((sub) =>
      sub.id === subtask.id ? { ...sub, done: !sub.done } : sub,
    );
    dispatch(updateTask({ ...task, subtasks: newSubTasks }));
  };

  const handleDelete = () => {
    const newSubTasks = task.subtasks.filter((sub) => sub.id !== subtask.id);
    dispatch(updateTask({ ...task, subtasks: newSubTasks }));
  };

  return (
    <div className={styles.subtask}>
      <div className={styles.task_wrapper} onClick={handleChecked}>
        <input
          type='checkbox'
          checked={subtask.done}
          className={styles.checkbox}
          onChange={handleChecked}
        />
        <span className={`${subtask.done ? styles.done : ''}`}>
          {subtask.text}
        </span>
      </div>
      <img
        src={deleteIcon}
        alt='delete-icon'
        className={styles.icon}
        onClick={handleDelete}
      />
    </div>
  );
}

export { SubTask };
