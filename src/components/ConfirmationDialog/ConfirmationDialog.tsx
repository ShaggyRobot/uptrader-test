import { ModalComponent } from '../ModalComponent/ModalComponent';
import styles from './ConfirmationDialog.module.css';

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (openState: boolean) => void;
  message: string;
  subjAction: () => void;
};

function ConfirmationDialog(props: Props): JSX.Element {
  const { dialogOpen, setDialogOpen, message, subjAction } = props;

  return (
    <ModalComponent open={dialogOpen} setOpen={setDialogOpen}>
      <div className={styles.dialog}>
        <h2>{message}</h2>
        <div className={styles.btn_block}>
          <button onClick={subjAction}>Yes</button>
          <button className='close-modal'>Cancel</button>
        </div>
      </div>
    </ModalComponent>
  );
}

export { ConfirmationDialog };
