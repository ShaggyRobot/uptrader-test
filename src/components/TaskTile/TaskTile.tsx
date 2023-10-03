import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Task } from '../../redux/types';

import { ModalComponent } from '../ModalComponent/ModalComponent';
import { TaskDetails } from '../TaskDetails/TaskDetails';
import { getTimeDiff } from '../../utils';

import start from '../../assets/icons/event_start.svg';
import timer from '../../assets/icons/timer.svg';
import completed from '../../assets/icons/done.svg';
import styles from './TaskTile.module.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/store';

type Props = {
  task: Task;
  index: number;
};

function TaskTile(props: Props): JSX.Element {
  const { task, index } = props;
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false);

  const timeAtWork = task.dateCompleted
    ? getTimeDiff(new Date(task.dateCompleted), new Date(task.dateCreated))
    : getTimeDiff(new Date(), new Date(task.dateCreated));

  const handleClick = () => {
    setModalOpen(true);
    // dispatch(deleteTask({ projectId: task.projectId, taskId: task.id }));
  };

  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snap) => (
        <div
          className={styles.task_wrapper}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={styles.task_component}
            onClick={handleClick}
            {...provided.dragHandleProps}
          >
            <span className={styles.number}>{`#${task.number}`}</span>
            <span className={styles.title} title={task.title}>
              {task.title}
            </span>

            <div className={styles.description}>{task.description}</div>

            <div
              className={`${
                task.priority === 'low'
                  ? `${styles.priority_low} ${styles.priority}`
                  : task.priority === 'normal'
                  ? `${styles.priority_normal} ${styles.priority}`
                  : `${styles.priority_high} ${styles.priority}`
              }`}
            >
              {task.priority}
            </div>
            <div className={styles.info}>
              <div className={styles.info_row}>
                <img src={start} alt='start-icon' className={styles.icon} />
                <span>
                  {new Date(task.dateCreated).toLocaleDateString('en-UK', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
              <hr />
              <div className={styles.info_row}>
                <img src={timer} alt='timer-icon' className={styles.icon} />
                <span>{timeAtWork}</span>
              </div>

              {task.dateCompleted && (
                <div className={styles.info_row}>
                  <img
                    src={completed}
                    alt='timer-icon'
                    className={styles.icon}
                  />
                  <span>
                    {new Date(task.dateCompleted).toLocaleDateString('en-UK', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <ModalComponent open={modalOpen} setOpen={setModalOpen}>
            <TaskDetails task={task} timeAtWork={timeAtWork} />
          </ModalComponent>
        </div>
      )}
    </Draggable>
  );
}

export { TaskTile };
