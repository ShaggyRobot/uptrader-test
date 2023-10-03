import { UUID } from 'crypto';

type Project = {
  id: UUID;
  title: string;
  tasks: Task[];
};

type Task = {
  id: UUID;
  projectId: UUID;
  number: number;
  title: string;
  description: string;
  dateCreated: Date;
  dateCompleted?: Date | null;
  timeAtWork?: Date;
  priority: 'low' | 'normal' | 'high';
  filesAttached: { fileName: string; url: string }[];
  status: 'queue' | 'development' | 'done';
  subtasks: Array<Subtask>;
  // comments: Array<Comment>;
};

type Subtask = {
  id?: UUID;
  text: string;
  done: boolean;
};

type CommentType = {
  id: UUID;
  subjectId: UUID;
  userName: string;
  text: string;
  // comments: Array<Comment>;
};

export { type Project, type Task, type Subtask, type CommentType };
