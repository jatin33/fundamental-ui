import React, { useState } from 'react';
import { Column } from './Column';
import type { BoardState, ColumnConfig } from './types';
import './kanban.css';


// User starts dragging → dragstart → dragenter → dragover → drop → dragend


// Sample data for testing
const initialTasks = {
  'task-1': { id: 'task-1', title: 'Design user interface mockups', status: 'backlog' as const },
  'task-2': { id: 'task-2', title: 'Set up database schema', status: 'backlog' as const },
  'task-3': { id: 'task-3', title: 'Create API endpoints', status: 'backlog' as const },
  'task-4': { id: 'task-4', title: 'Implement user authentication', status: 'in_progress' as const },
  'task-5': { id: 'task-5', title: 'Add drag and drop functionality', status: 'in_progress' as const },
  'task-6': { id: 'task-6', title: 'Write unit tests', status: 'done' as const },
  'task-7': { id: 'task-7', title: 'Deploy to production', status: 'done' as const },
};

const initialBoardState: BoardState = {
  tasks: initialTasks,
  columns: {
    backlog: ['task-1', 'task-2', 'task-3'],
    in_progress: ['task-4', 'task-5'],
    done: ['task-6', 'task-7'],
  },
};

// Column configuration
const columnConfigs: ColumnConfig[] = [
  { id: 'backlog', title: 'Backlog', status: 'backlog' },
  { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
  { id: 'done', title: 'Done', status: 'done' },
];

export const Board: React.FC = () => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);

  const handleDrop = ({ source, destination, taskId }: { source: 'backlog' | 'in_progress' | 'done'; destination: 'backlog' | 'in_progress' | 'done'; taskId: string }) => {
    console.log({
       source,
       destination, 
       taskId
    });
    
    const updatedTask = { ...boardState.tasks[taskId], status: destination };

    const updatedSourceColumn = boardState.columns[source].filter((item) => item !== taskId);
    const updatedDestinationColumn = [...boardState.columns[destination], taskId];

    setBoardState((s) => {
      return {
        ...s,
        tasks: {
          ...s.tasks,
          [taskId]: updatedTask
        },
        columns: {
          ...s.columns,
          [source]: updatedSourceColumn,
          [destination]: updatedDestinationColumn,
        }
      }
    })
  };

  console.log("boardState>>", boardState);
  
  return (
    <div className={"kanban-board"}>
      {columnConfigs.map((columnConfig) => {
        // Get tasks for this column in the correct order
        const taskIds = boardState.columns[columnConfig.id];
        const tasks = taskIds.map(taskId => boardState.tasks[taskId]);

        return (
          <Column
            key={columnConfig.id}
            column={columnConfig}
            tasks={tasks}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
};
