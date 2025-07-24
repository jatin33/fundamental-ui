import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Virtualised from './Virtualised';
import PerformanceMonitor from './PerformanceMonitor';
import { generateTestData, type ListItem } from './generateTestData';

// Sample item renderer for the stories
const renderListItem = (item: ListItem, index: number) => (
  <div
    style={{
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
    }}
  >
    <img
      src={item.avatar}
      alt={item.name}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '12px'
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
        {item.name}
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        {item.email} • {item.department}
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div
        style={{
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          backgroundColor:
            item.status === 'active'
              ? '#4CAF50'
              : item.status === 'inactive'
              ? '#f44336'
              : '#ff9800',
          color: 'white'
        }}
      >
        {item.status.toUpperCase()}
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
        ${item.salary.toLocaleString()}
      </div>
    </div>
  </div>
);

const meta: Meta<typeof Virtualised<ListItem>> = {
  title: 'Components/Virtualisation',
  component: Virtualised<ListItem>,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Virtualization Component

A high-performance virtualization component setup for rendering large lists efficiently.

## Key Features:
- **Mock Data Generator**: Creates realistic test data with consistent performance
- **TypeScript Support**: Fully typed interfaces for props and data structures  
- **Performance Ready**: Designed to handle 100k+ items efficiently
- **FPS Monitoring**: Integrated performance monitoring capabilities

## Virtualization Concepts:

### The Problem
Rendering 100k DOM elements causes:
- Memory issues (~100MB+ for full DOM tree)
- Performance degradation (exponential layout/paint cost)
- Scroll lag and unresponsive UI
- Blocked main thread during initial render

### The Solution: Windowing
Only render what's visible + small buffer:
- **Visible Items**: ~10-20 items in viewport
- **Buffer Zone**: 5-10 items above/below for smooth scrolling
- **Total Rendered**: ~30-40 DOM elements instead of 100k
- **Memory Savings**: ~99.97% reduction in DOM nodes

### Implementation Strategy:
1. **Viewport Calculations**: Determine visible range based on scroll position
2. **Virtual Positioning**: Use absolute positioning instead of document flow
3. **Scroll Optimization**: Throttle scroll events to maintain 60fps
4. **Buffer Management**: Render extra items for seamless scrolling experience

## Ready to implement your virtualization logic!
        `
      }
    }
  },
  argTypes: {
    items: {
      control: false,
      description: 'Array of items to virtualize'
    },
    itemHeight: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Fixed height of each item in pixels'
    },
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: 'Height of the viewport container'
    },
    buffer: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Number of items to render outside visible area'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Virtualised<ListItem>>;

export const Default: Story = {
  args: {
    items: generateTestData(100000),
    itemHeight: 60,
    height: 600,
    buffer: 5,
    renderItem: renderListItem
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <PerformanceMonitor 
          showFPS={true} 
          showMetrics={true}
          fpsPosition={{ top: 10, right: 10 }}
        />
        <Story />
      </div>
    )
  ]
};

export const SmallDataset: Story = {
  args: {
    items: generateTestData(1000),
    itemHeight: 60,
    height: 400,
    buffer: 3,
    renderItem: renderListItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller dataset (1k items) for initial development and testing'
      }
    }
  }
};

export const LargeItemHeight: Story = {
  args: {
    items: generateTestData(50000),
    itemHeight: 120,
    height: 600,
    buffer: 5,
    renderItem: (item: ListItem, index: number) => (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          height: '120px',
          backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
          borderBottom: '1px solid #eee'
        }}
      >
        <img
          src={item.avatar}
          alt={item.name}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            marginRight: '20px'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
            {item.name}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {item.email}
          </div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {item.department} • Joined {item.joinDate}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '8px',
              backgroundColor:
                item.status === 'active'
                  ? '#4CAF50'
                  : item.status === 'inactive'
                  ? '#f44336'
                  : '#ff9800',
              color: 'white'
            }}
          >
            {item.status.toUpperCase()}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            ${item.salary.toLocaleString()}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger item height (120px) with more detailed item rendering'
      }
    }
  }
};

export const WithoutPerformanceMonitor: Story = {
  args: {
    items: generateTestData(100000),
    itemHeight: 60,
    height: 600,
    buffer: 5,
    renderItem: renderListItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean view without performance monitoring overlay'
      }
    }
  }
};

export const MaximumDataset: Story = {
  args: {
    items: generateTestData(1000000),
    itemHeight: 50,
    height: 700,
    buffer: 10,
    renderItem: (item: ListItem, index: number) => (
      <div
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          height: '50px',
          backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
          fontSize: '14px'
        }}
      >
        <div style={{ width: '40px', textAlign: 'center', marginRight: '12px' }}>
          #{item.id}
        </div>
        <div style={{ flex: 1 }}>
          <strong>{item.name}</strong> - {item.department}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          ${item.salary.toLocaleString()}
        </div>
      </div>
    )
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative' }}>
        <PerformanceMonitor 
          showFPS={true} 
          showMetrics={true}
          fpsPosition={{ top: 10, right: 10 }}
        />
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          border: '2px solid #ff6b6b',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#d63031',
          zIndex: 1000
        }}>
          ⚠️ STRESS TEST: 1 Million Items
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: '🚨 **STRESS TEST**: 1 million items to test extreme performance scenarios. This demonstrates why virtualization is essential for large datasets.'
      }
    }
  }
};
