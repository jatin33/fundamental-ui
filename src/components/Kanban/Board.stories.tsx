import type { Meta, StoryObj } from '@storybook/react';
import { Board } from './Board';

const meta: Meta<typeof Board> = {
  title: 'Components/Kanban Board',
  component: Board,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Kanban Board Component

A drag-and-drop Kanban board with three columns: Backlog, In Progress, and Done.

## Current Features
- ✅ Three-column layout (Backlog, In Progress, Done)
- ✅ Task cards with hover effects
- ✅ Color-coded columns
- ✅ Responsive design
- ✅ Sample data for demonstration

## Coming Next
- 🚧 HTML5 drag and drop functionality
- 🚧 Task reordering within columns
- 🚧 Task creation and editing
- 🚧 Persistence with localStorage

## Usage
This is the basic layout foundation. The next step will be adding drag and drop functionality using HTML5 native APIs.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic Kanban Board',
  render: () => <Board />,
};

export const EmptyBoard: Story = {
  name: 'Empty Board (Future Implementation)',
  render: () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>📋 Empty board state will be implemented when we add task creation functionality</p>
      <Board />
    </div>
  ),
};

export const DragDropPreview: Story = {
  name: 'Drag & Drop Preview (Next Step)',
  render: () => (
    <div>
      <div style={{ 
        padding: '20px', 
        marginBottom: '20px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🎯 Next Step: Drag & Drop</h3>
        <p style={{ margin: 0, color: '#1565c0' }}>
          In the next step, we'll make these task cards draggable and add drop zones to columns.
          We'll use HTML5 native drag and drop APIs to understand the fundamentals.
        </p>
      </div>
      <Board />
    </div>
  ),
};
