import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Task } from '../../redux/types';
import { Project } from '../../redux/types';

import deleteIcon from '../../assets/icons/trash_bin.svg';

import styles from './ProjectTile.module.css';
import { deleteProject } from '../../redux/store';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { useState } from 'react';

type Props = {
  project: Project;
};

function ProjectTile(props: Props): JSX.Element {
  const { project } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
  };

  const countStatus = (status: Task['status']) =>
    project.tasks.reduce(
      (acc, rec) => (rec.status === status ? acc + 1 : acc),
      0,
    );

  return (
    <>
      <div
        className={styles.project_tile}
        onClick={() => navigate(`project/${project.id}`)}
      >
        <img
          src={deleteIcon}
          alt='delete-icon'
          className={styles.delete_icon}
          onClick={(e) => {
            e.stopPropagation();
            setConfirmOpen(true);
          }}
        />

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
      <ConfirmationDialog
        dialogOpen={confirmOpen}
        setDialogOpen={setConfirmOpen}
        message='Delete Project?'
        subjAction={handleDelete}
      />
    </>
  );
}

export { ProjectTile };
