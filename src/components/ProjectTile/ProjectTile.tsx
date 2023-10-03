import { Project } from '../../redux/types';
import styles from './ProjectTile.module.css';
import { Task } from '../../redux/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  project: Project;
};

function ProjectTile(props: Props): JSX.Element {
  const { project } = props;
  const navigate = useNavigate();
  
  const countStatus = (status: Task['status']) =>
    project.tasks.reduce(
      (acc, rec) => (rec.status === status ? acc + 1 : acc),
      0,
    );

  return (
    <div
      className={styles.project_tile}
      onClick={() => navigate(`project/${project.id}`)}
    >
      <span className={styles.title}>{project.title}</span>
      <hr />
      <div className={styles.info_row}>
        <span>Tasks: </span>
        <span>{project.tasks.length}</span>
      </div>

      <div className={`${styles.info_row} ${styles.queue}`}>
        <span>Queued:</span>
        <span>{countStatus('queue')}</span>
      </div>

      <div className={`${styles.info_row} ${styles.dev}`}>
        <span>In Development:</span>
        <span>{countStatus('development')}</span>
      </div>

      <div className={`${styles.info_row} ${styles.done}`}>
        <span>Done:</span>
        <span>{countStatus('done')}</span>
      </div>
    </div>
  );
}

export { ProjectTile };
