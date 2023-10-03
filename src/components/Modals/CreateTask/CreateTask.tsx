import { ChangeEvent, useState } from 'react';
import styles from './CreateTask.module.css';
import { Task } from '../../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { State, addTask } from '../../../redux/store';
import { UUID } from 'crypto';

type TaskData = {
  title: string;
  description: string;
  priority: Task['priority'];
  status: Task['status'];
  filesAttached: Task['filesAttached'];
};

type Props = {
  projectId: UUID;
};

function CreateTask(props: Props): JSX.Element {
  const { projectId } = props;
  const [task, setTask] = useState<TaskData>({
    title: '',
    description: '',
    priority: 'low',
    status: 'queue',
    filesAttached: [],
  });

  const { projects, taskCount } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const project = projects.find((project) => project.id === projectId);

  const createTask = () => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID() as UUID,
      projectId,
      number: taskCount,
      dateCreated: new Date(),
      subtasks: [],
    };

    dispatch(addTask({ projectId, task: newTask }));
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <div className={styles.create_task}>
      <h2>Create Task</h2>
      <form className={styles.create_task_form}>
        <input
          type='text'
          placeholder='Task name...'
          name='title'
          onChange={(e) => handleFormChange(e)}
          value={task.title}
        />
        <textarea
          // type='text'
          placeholder='Task description...'
          name='description'
          value={task.description}
          onChange={(e) => handleFormChange(e)}
        />

        <fieldset>
          <legend>Priority</legend>
          <input
            type='radio'
            defaultChecked
            name='priority'
            id='priority-low'
            value='low'
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor='priority-low'>LOW</label>

          <input
            type='radio'
            name='priority'
            id='priority-normal'
            value='normal'
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor='priority-normal'>NORMAL</label>

          <input
            type='radio'
            name='priority'
            id='priority-high'
            value='high'
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor='priority-high'>HIGH</label>
        </fieldset>
      </form>
      <div className={styles.btn_block}>
        <button
          onClick={createTask}
          disabled={!task || !task.title || !task.description}
          className='close-modal'
        >
          Create
        </button>
        <button className='close-modal'>Cancel</button>
      </div>
    </div>
  );
}

export { CreateTask };
