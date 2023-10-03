import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

function NotFoundPage(): JSX.Element {
  const navidate = useNavigate();

  return (
    <div className={styles.not_found}>
      <h1>Page Not Found</h1>
      <button onClick={() => navidate('/')}>Go Back</button>
    </div>
  );
}

export { NotFoundPage };
