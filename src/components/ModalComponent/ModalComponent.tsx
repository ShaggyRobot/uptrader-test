import styles from './ModalComponent.module.css';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: JSX.Element;
}

function ModalComponent(props: ModalProps): JSX.Element {
  const { open, setOpen, children } = props;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).classList.contains('close-modal') &&
      setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className={`${styles.modal_overlay} close-modal`}
          onClick={(e) => handleClose(e)}
        >
          <div className={styles.modal_content}>
            <div style={{ pointerEvents: 'all' }}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export { ModalComponent };
