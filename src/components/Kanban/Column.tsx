import React, { useState } from 'react';
import { Task } from './Task';
import type { Task as TaskType, ColumnConfig } from './types';

interface ColumnProps {
    column: ColumnConfig;
    tasks: TaskType[];
    onDrop?: ({ source, destination, taskId }: { source: 'backlog' | 'in_progress' | 'done'; destination: 'backlog' | 'in_progress' | 'done'; taskId: string }) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, tasks, onDrop }) => {
    const [dropping, setDropping] = useState(false);

    return (
        <div
            className={`kanban-column ${dropping ? "drag-over" : ""}`}
            data-column={column.id}
            // We'll add drop zone props here later
            onDragEnter={(e) => {
                console.log("enter>>");
                setDropping(true);
            }}
            onDragLeave={(e) => {
                console.log("leave>>");

                setDropping(false);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                console.log("dragover>>");

            }}
            onDrop={(e) => {
                try {
                    const dto = e.dataTransfer.getData("application/json");
                    const task = JSON.parse(dto);
                    onDrop?.({
                        taskId: task.taskId,
                        source: task.sourceColumn,
                        destination: column.status,
                    });
                } catch (err) {

                }
            }}
        >
            <h3 className="column-header">{column.title}</h3>
            <div className="column-tasks">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};
