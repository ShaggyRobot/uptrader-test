import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import styles from './App.module.css';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage/ProjectPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/' element={<ProjectsPage />} />
        <Route path='/project/:id' element={<ProjectPage />} />
        <Route path='/*' element={<Navigate to='404' />} />
        <Route path='/404' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
