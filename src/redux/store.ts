import { createStore, Reducer } from 'redux';
import { CommentType, Project, Task } from './types';
import { UUID } from 'crypto';

type State = {
  taskCount: number;
  projects: Array<Project>;
  userName: string;
  comments: Array<CommentType>;
};

type ActionType =
  | { type: 'addProject'; payload: Project }
  | { type: 'deleteProject'; payload: UUID }
  | { type: 'addTask'; payload: { projectId: UUID; task: Task } }
  | { type: 'deleteTask'; payload: { projectId: UUID; taskId: UUID } }
  | { type: 'addComment'; payload: CommentType }
  | { type: 'updateProject'; payload: Project }
  | { type: 'updateTask'; payload: Task };

const defaultState: State = {
  taskCount: 0,
  projects: [],
  userName: 'User',
  comments: [],
};

const init = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState')!)
  : defaultState;

const appReducer: Reducer<State, ActionType> = (
  state: State = init,
  action: ActionType,
): State => {
  switch (action.type) {
    case 'addProject':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case 'updateProject': {
      const updatedProject = action.payload;
      const newProjects = state.projects.map((project) => {
        if (project.id === updatedProject.id) {
          return {
            ...project,
            ...updatedProject,
          };
        }
        return project;
      });

      return {
        ...state,
        projects: newProjects,
      };
    }

    case 'deleteProject':
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload,
        ),
      };

    case 'addTask': {
      const { projectId, task } = action.payload;
      const newProjects = [...state.projects];
      const project = newProjects.find((project) => project.id === projectId);

      if (project) {
        project.tasks = [...project.tasks, task];
        return {
          ...state,
          projects: newProjects,
          taskCount: state.taskCount + 1,
        };
      } else {
        return state;
      }
    }

    case 'updateTask': {
      const { projectId, id: taskId } = action.payload;
      const newProjects = [...state.projects];
      const project = newProjects.find((project) => project.id === projectId);
      if (project) {
        project.tasks = project.tasks.map((task) =>
          task.id === taskId ? action.payload : task,
        );

        return { ...state, projects: newProjects };
      } else {
        return state;
      }
    }

    case 'deleteTask': {
      const { projectId, taskId } = action.payload;
      const newProjects = [...state.projects];
      const project = newProjects.find((project) => project.id === projectId);

      if (project) {
        project.tasks = project.tasks.filter((task) => task.id !== taskId);

        return { ...state, projects: newProjects };
      } else {
        return state;
      }
    }

    case 'addComment': {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    }

    default:
      return state;
  }
};

const addProject = (project: Project) => {
  return { type: 'addProject', payload: project };
};

const deleteProject = (projectId: string) => {
  return { type: 'deleteProject', payload: projectId };
};

const addTask = (payload: { projectId: string; task: Task }) => {
  return { type: 'addTask', payload };
};

const deleteTask = (payload: { projectId: UUID; taskId: UUID }) => {
  return { type: 'deleteTask', payload };
};

const updateTask = (payload: Task) => {
  return { type: 'updateTask', payload };
};

const addComment = (payload: CommentType) => {
  return { type: 'addComment', payload };
};

const updateProject = (payload: Project) => {
  return { type: 'updateProject', payload };
};

const appStore = createStore(appReducer);

appStore.subscribe(() => {
  const store = appStore.getState();
  localStorage.setItem('appState', JSON.stringify(store));
});

export { type State };
export {
  appStore,
  addProject,
  deleteProject,
  updateProject,
  addTask,
  updateTask,
  deleteTask,
  addComment,
};
