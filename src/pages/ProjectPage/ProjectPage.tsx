import { Navigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { State, updateProject } from '../../redux/store';
import { Project, Task } from '../../redux/types';
import { TaskTile } from '../../components/TaskTile/TaskTile';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import { CreateTask } from '../../components/Modals/CreateTask/CreateTask';
import { useState } from 'react';
import { UUID } from 'crypto';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import styles from './ProjectPage.module.css';

type TasksObj = Record<Task['status'], Task[]>;

const statusList: Task['status'][] = ['queue', 'development', 'done'];

function ProjectPage(): JSX.Element {
  const { id } = useParams();
  const projects = useSelector((state: State) => state.projects);
  const project = projects.find((project) => project.id === id) as Project;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  let tasks = project?.tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search) ||
      task.number.toString().includes(search),
  );

  const taskByStatus = (status: Task['status']) => {
    return tasks?.filter((task) => task.status === status);
  };

  const tasksObj: TasksObj = statusList.reduce((acc, rec) => {
    if (!acc[rec]) {
      acc[rec] = taskByStatus(rec) || [];
    }
    return acc;
  }, {} as TasksObj);

  const onDragEnd = (res: DropResult) => {
    const { destination, source, draggableId } = res;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startTasks = taskByStatus(source.droppableId as Task['status']);
    const finishTasks = taskByStatus(destination.droppableId as Task['status']);
    let combined = [];

    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(startTasks!);
      const [yanked] = newTasks.splice(source.index, 1);

      newTasks.splice(destination.index, 0, yanked);
      tasksObj[destination.droppableId as Task['status']] = newTasks || [];
      combined = Object.keys(tasksObj).reduce(
        (acc, rec) => [...acc, ...tasksObj[rec as Task['status']]],
        [] as Task[],
      );
    } else {
      const [yanked] = startTasks.splice(source.index, 1);
      yanked.status = destination.droppableId as Task['status'];
      if (destination.droppableId === 'done') {
        yanked.dateCompleted = new Date();
      } else {
        yanked.dateCompleted = null;
      }
      finishTasks.splice(destination.index, 0, yanked);

      tasksObj[source.droppableId as Task['status']] = startTasks || [];
      tasksObj[destination.droppableId as Task['status']] = finishTasks || [];
      combined = Object.keys(tasksObj).reduce(
        (acc, rec) => [...acc, ...tasksObj[rec as Task['status']]],
        [] as Task[],
      );
    }

    dispatch(updateProject({ ...project, tasks: combined }));
  };

  return project ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.project_page}>
        <h1>{project.title}</h1>

        <button onClick={() => setModalOpen(true)}>CREATE TASK</button>

        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className={styles.search_field}
          placeholder='Search by title or number...'
        />

        <div className={styles.page_content}>
          <div className={`${styles.column} ${styles.column_queue}`}>
            <div className={styles.column_title}>Queue</div>

            <Droppable droppableId='queue' direction='vertical' type='task'>
              {(provided) => (
                <div
                  className={styles.column_content}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasksObj['queue'].map((task, index) => (
                    <TaskTile task={task} key={task.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className={`${styles.column} ${styles.column_dev}`}>
            <div className={styles.column_title}>Development</div>

            <Droppable
              droppableId='development'
              direction='vertical'
              type='task'
            >
              {(provided) => (
                <div
                  className={styles.column_content}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasksObj['development'].map((task, index) => (
                    <TaskTile task={task} key={task.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className={`${styles.column} ${styles.column_done}`}>
            <div className={styles.column_title}>Done</div>

            <Droppable droppableId='done' direction='vertical' type='task'>
              {(provided) => (
                <div
                  className={styles.column_content}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasksObj['done'].map((task, index) => (
                    <TaskTile task={task} key={task.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <ModalComponent open={modalOpen} setOpen={setModalOpen}>
          <CreateTask projectId={id! as UUID} />
        </ModalComponent>
      </div>
    </DragDropContext>
  ) : (
    <Navigate to='/404' />
  );
}

export { ProjectPage };
