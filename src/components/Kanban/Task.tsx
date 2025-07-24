import React, { useState } from 'react';
import type { Task as TaskType } from './types';

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const [dragging, setDragging] = useState(false);


  return (
    <div
      className={`task-card ${dragging ? "dragging" : ""}`}
      // We'll add drag and drop props here later
      draggable
      onDragStart={(e) => {
        setDragging(true);
        e.dataTransfer.setData("application/json", JSON.stringify({
          taskId: task.id,
          sourceColumn: task.status
        }));
      }}
      onDragEnd={(e) => {
        setDragging(false);
        e.dataTransfer.clearData("application/json");
      }}
    >
      <p className="task-title">{task.title}</p>
    </div>
  );
};
