import { ChangeEvent } from 'react';
import styles from './FileInput.module.css';

type Props = {
  addFiles: (addedFiles: FileList) => void;
};

function FileInput(props: Props): JSX.Element {
  const { addFiles } = props;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  return (
    <div className={styles.file_input}>
      <input
        type='file'
        id='file-input'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export { FileInput };
