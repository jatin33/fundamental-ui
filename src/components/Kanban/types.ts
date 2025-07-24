// TypeScript interfaces for our Kanban board

export interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in_progress' | 'done';
}

export interface BoardState {
  // Ordered arrays of task IDs for each column
  columns: {
    backlog: string[];
    in_progress: string[];
    done: string[];
  };
  // Quick lookup map for task details
  tasks: { [key: string]: Task };
}

export interface ColumnConfig {
  id: 'backlog' | 'in_progress' | 'done';
  title: string;
  status: 'backlog' | 'in_progress' | 'done';
}

// Drag and drop related types (we'll use these later)
export interface DragData {
  taskId: string;
  sourceColumn: string;
}
