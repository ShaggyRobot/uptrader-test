import { FileInput } from '../FileInput/FileInput';
import { Task } from '../../redux/types';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../redux/store';

import paperclipIcon from '../../assets/icons/paper-clip.svg';
import addIcon from '../../assets/icons/add_circle.svg';

import styles from './FilesAttached.module.css';

type Props = {
  task: Task;
};

function FilesAttached(props: Props): JSX.Element {
  const { task } = props;
  const files = task.filesAttached;

  const dispatch = useDispatch();

  const addFiles = (addedFiles: FileList) => {
    const file = addedFiles[0];
    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', () => {
      const url = fileReader.result as string;
      const newFiles = [...task.filesAttached, { fileName: file.name, url }];
      const newTask = { ...task, filesAttached: newFiles };
      dispatch(updateTask(newTask));
    });

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.files_attached}>
      <ul className={styles.file_list}>
        {!!files.length && files.map((file, idx) => {
            let src;
            if (
              ['jpg', 'png', 'gif'].includes(
                file.fileName.split('.').pop() || '',
              )
            ) {
              src = file.url;
            } else {
              src = paperclipIcon;
            }
            return (
              <li key={idx} className={styles.file_preview}>
                <img src={src} alt='preview' className={styles.img_preview} />
                <span className={styles.file_name}>{file.fileName}</span>
              </li>
            );
          })}
        <label htmlFor='file-input' className={styles.input_label}>
          <img src={addIcon} alt='add-icon' className={styles.add_icon} />
        </label>
        <FileInput addFiles={addFiles} />
      </ul>
    </div>
  );
}

export { FilesAttached };
