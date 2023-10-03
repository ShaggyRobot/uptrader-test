import { useDispatch, useSelector } from 'react-redux';

import { State, deleteProject } from '../../redux/store';

import styles from './ProjectsPage.module.css';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import { useState } from 'react';
import { CreateProject } from '../../components/Modals/CreateProject/CreateProject';
import { ProjectTile } from '../../components/ProjectTile/ProjectTile';
import addIcon from '../../assets/icons/add_circle.svg';

function ProjectsPage(): JSX.Element {
  const projects = useSelector((state: State) => state.projects);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const deleteHandler = (id: string) => {
    dispatch(deleteProject(id));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.projects_page}>
      <h1>Projects</h1>
      <div className={styles.projects_list}>
        {projects &&
          projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        <div onClick={openModal} className={styles.create_btn}>
          <img className={styles.icon} src={addIcon} alt='' />
        </div>
      </div>
      <ModalComponent open={modalOpen} setOpen={setModalOpen}>
        <CreateProject />
      </ModalComponent>
    </div>
  );
}

export { ProjectsPage };
