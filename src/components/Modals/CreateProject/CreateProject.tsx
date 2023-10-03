import { useState } from 'react';
import styles from './CreateProject.module.css';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../redux/store';
import { Project } from '../../../redux/types';
import { UUID } from 'crypto';

function CreateProject(): JSX.Element {
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();

  const createProject = () => {
    const project: Project = {
      id: crypto.randomUUID() as UUID,
      title: projectName,
      tasks: [],
    };

    dispatch(addProject(project));
  };

  return (
    <div className={styles.create_project}>
      <h2>Create Project</h2>
      <input
        type='text'
        placeholder='Project name...'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <div className={styles.btn_block}>
        <button
          onClick={createProject}
          disabled={!projectName.length}
          className='close-modal'
        >
          Create
        </button>
        <button className='close-modal'>Cancel</button>
      </div>
    </div>
  );
}

export { CreateProject };
