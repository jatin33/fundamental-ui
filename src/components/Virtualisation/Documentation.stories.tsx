import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Documentation Component
const DocumentationViewer: React.FC<{ content: string; title: string }> = ({ content, title }) => {
  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #e9ecef'
      }}>
        <h1 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '28px', 
          color: '#0366d6',
          borderBottom: '2px solid #0366d6',
          paddingBottom: '8px'
        }}>
          {title}
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
          Complete implementation guide for high-performance virtualization
        </p>
      </div>
      
      <div style={{ 
        whiteSpace: 'pre-wrap',
        fontSize: '14px',
        backgroundColor: 'white',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
        padding: '20px'
      }}>
        {content.split('\n').map((line, index) => {
          // Handle different markdown elements
          if (line.startsWith('# ')) {
            return (
              <h1 key={index} style={{ 
                fontSize: '24px', 
                color: '#0366d6', 
                marginTop: index === 0 ? '0' : '32px',
                marginBottom: '16px',
                borderBottom: '1px solid #eee',
                paddingBottom: '8px'
              }}>
                {line.replace('# ', '')}
              </h1>
            );
          }
          
          if (line.startsWith('## ')) {
            return (
              <h2 key={index} style={{ 
                fontSize: '20px', 
                color: '#24292e', 
                marginTop: '24px',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                {line.replace('## ', '')}
              </h2>
            );
          }
          
          if (line.startsWith('### ')) {
            return (
              <h3 key={index} style={{ 
                fontSize: '18px', 
                color: '#24292e', 
                marginTop: '20px',
                marginBottom: '10px',
                fontWeight: '600'
              }}>
                {line.replace('### ', '')}
              </h3>
            );
          }
          
          if (line.startsWith('#### ')) {
            return (
              <h4 key={index} style={{ 
                fontSize: '16px', 
                color: '#0366d6', 
                marginTop: '16px',
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                {line.replace('#### ', '')}
              </h4>
            );
          }
          
          if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
            const isCompleted = line.startsWith('- [x]');
            const text = line.replace(/- \[[x ]\] /, '');
            return (
              <div key={index} style={{ 
                margin: '4px 0',
                paddingLeft: '20px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <span style={{ 
                  marginRight: '8px',
                  color: isCompleted ? '#28a745' : '#6a737d',
                  fontSize: '16px'
                }}>
                  {isCompleted ? '✅' : '☐'}
                </span>
                <span style={{ 
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  color: isCompleted ? '#6a737d' : '#24292e'
                }}>
                  {text}
                </span>
              </div>
            );
          }
          
          if (line.startsWith('- ')) {
            return (
              <div key={index} style={{ 
                margin: '4px 0',
                paddingLeft: '20px'
              }}>
                <span style={{ marginRight: '8px', color: '#0366d6' }}>•</span>
                {line.replace('- ', '')}
              </div>
            );
          }
          
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <div key={index} style={{ 
                fontWeight: 'bold', 
                color: '#0366d6',
                margin: '12px 0 8px 0',
                fontSize: '15px'
              }}>
                {line.replace(/\*\*/g, '')}
              </div>
            );
          }
          
          if (line.trim() === '---') {
            return (
              <hr key={index} style={{ 
                margin: '24px 0',
                border: 'none',
                borderTop: '2px solid #e1e4e8'
              }} />
            );
          }
          
          if (line.trim() === '') {
            return <br key={index} />;
          }
          
          return (
            <div key={index} style={{ margin: '4px 0' }}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const implementationGuide = `# Virtualization Implementation Guide

## 🎯 Project Status: Foundation Complete - Ready for Core Implementation

### ✅ Completed Foundation
- [x] Mock data generator (100k items)
- [x] TypeScript interfaces and types  
- [x] Performance monitoring with FPS stats
- [x] Storybook integration with comprehensive demos
- [x] React component structure setup

---

## 🚧 Implementation Roadmap

### **Phase 1: Core Virtualization Logic**
**Priority: CRITICAL - Start Here**

#### 1.1 Viewport Calculations
- [ ] **Calculate visible item range based on scroll position**
- [ ] **Determine visible count from container height**
- [ ] **Handle edge cases** (empty lists, single items, container resize)

#### 1.2 Scroll Event Handling  
- [ ] **Implement throttled scroll listener** (target: 16ms/60fps)
- [ ] **Track scroll position state**
- [ ] **Update visible range on scroll**
- [ ] **Integrate with performance monitor**

#### 1.3 Virtual DOM Rendering
- [ ] **Create container with proper height**
- [ ] **Implement absolute positioning for visible items**
- [ ] **Render only visible items** (slice from items array)
- [ ] **Handle item positioning with CSS transforms**

### **Phase 2: Performance Optimization**
**Priority: HIGH - Critical for 100k items**

#### 2.1 React Optimizations
- [ ] **Implement React.memo for item components**
- [ ] **Use useCallback for scroll handlers**
- [ ] **Use useMemo for calculated values**

#### 2.2 Memory Management
- [ ] **Implement item recycling** (reuse DOM elements)
- [ ] **Cleanup event listeners on unmount**
- [ ] **Optimize state updates** (batch updates)

#### 2.3 Scroll Performance
- [ ] **Use requestAnimationFrame for smooth updates**
- [ ] **Implement intersection observer** (alternative to scroll events)
- [ ] **Add will-change CSS hints** for GPU acceleration

### **Phase 3: Advanced Features**
**Priority: MEDIUM - Enhanced UX**

#### 3.1 Dynamic Heights (Optional)
- [ ] **Implement height measurement system**
- [ ] **Create position cache for variable heights**
- [ ] **Handle height updates on content changes**

#### 3.2 Navigation Features
- [ ] **Scroll-to-index functionality**
- [ ] **Keyboard navigation support**
- [ ] **Maintain scroll position on data updates**

#### 3.3 Enhanced UX
- [ ] **Loading states for data fetching**
- [ ] **Empty state handling**
- [ ] **Skeleton loading during scroll**

---

## 🧠 Core Concepts & Implementation Details

### **1. The Windowing Principle**
Total Items: 100,000
Visible Items: ~15 (based on container height)
Buffer Items: 5 above + 5 below = 10
Total Rendered: ~25 items instead of 100,000
Memory Savings: 99.975%

### **2. Performance Targets**
- **Frame Rate**: Maintain 60fps during scrolling
- **Memory Usage**: <50MB for 100k items (vs ~2GB without virtualization)
- **Initial Render**: <100ms
- **Scroll Response**: <16ms per update

### **3. Implementation Strategy**

#### Step 1: Basic Viewport (Start Here)
1. Create scrollable container with fixed height
2. Calculate visible range from scroll position
3. Render only visible items with absolute positioning
4. Test with small dataset (1k items)

#### Step 2: Add Buffer Zones
1. Extend visible range with buffer items
2. Implement smooth scrolling with extra items
3. Test scroll performance

#### Step 3: Performance Integration
1. Connect to PerformanceMonitor
2. Add render count tracking
3. Implement throttled scroll handling
4. Test with 100k items

#### Step 4: Production Polish
1. Add React optimizations (memo, callbacks)
2. Handle edge cases and error states
3. Add comprehensive testing
4. Performance validation with 1M items

---

## 📚 Key Files Reference

### **Implementation Files**
- Virtualised.tsx - Main component (needs core logic)
- types.ts - All TypeScript interfaces
- generateTestData.ts - Mock data for testing

### **Supporting Files**
- PerformanceMonitor.tsx - FPS and metrics tracking
- Virtualised.stories.tsx - Test scenarios and demos
- react-fps-stats.d.ts - TypeScript declarations

---

## 🎯 Success Criteria

### **Minimum Viable Implementation**
- Renders 100k items without performance issues
- Maintains 60fps during scrolling
- Memory usage <100MB
- Smooth user experience

### **Ideal Implementation**
- Handles 1M+ items efficiently
- <16ms response time to scroll events
- Advanced features (scroll-to-index, keyboard nav)
- Production-ready error handling

---

*Ready for implementation! Start with Phase 1 and work through the roadmap.*`;

const quickStartGuide = `# Quick Start Guide

## 🚀 Getting Started

### Run Storybook
npm run storybook
Navigate to: Components -> Virtualisation

### View Documentation
Navigate to: Components -> Virtualisation -> Documentation

---

## 📁 Project Structure

src/components/Virtualisation/
├── Virtualised.tsx              # Main component (needs implementation)
├── Virtualised.stories.tsx      # Interactive demos with FPS monitoring
├── types.ts                     # TypeScript interfaces
├── generateTestData.ts          # Mock data generator (100k items)
├── PerformanceMonitor.tsx       # FPS stats & performance metrics
├── IMPLEMENTATION_GUIDE.md      # Detailed development roadmap
└── README.md                    # Project overview

---

## 🎯 Current Status

### ✅ Foundation Complete
- Mock data generator with 100k realistic items
- Performance monitoring with react-fps-stats  
- TypeScript interfaces and component structure
- Comprehensive Storybook demos (1k to 1M items)

### 🚧 Next Steps (Priority Order)
1. **CRITICAL**: Implement viewport calculations and scroll handling
2. **HIGH**: Add React optimizations and performance integration
3. **MEDIUM**: Advanced features (scroll-to-index, keyboard navigation)

---

## 🧠 Key Implementation Concepts

### **The Problem**
- 100k DOM elements = ~100MB memory + blocked UI
- Exponential performance degradation with large lists

### **The Solution**  
- **Windowing**: Render only visible items (~15) + buffer (~10) = ~25 total
- **Memory Savings**: 99.975% reduction in DOM nodes
- **Performance**: Maintain 60fps with millions of items

### **Core Formula**
const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
const endIndex = Math.min(items.length, startIndex + visibleCount + (buffer * 2));

---

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Frame Rate | 60fps | Ready for testing |
| Memory Usage | <50MB for 100k items | TBD |
| Initial Render | <100ms | TBD |
| Scroll Response | <16ms per update | TBD |

---

*All foundation components are ready. Start implementing with the detailed guide!*`;

const meta: Meta<typeof DocumentationViewer> = {
  title: 'Components/Virtualisation/Documentation',
  component: DocumentationViewer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive documentation for the virtualization implementation guide'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DocumentationViewer>;

export const ImplementationGuide: Story = {
  args: {
    title: '📖 Implementation Guide',
    content: implementationGuide
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete step-by-step implementation guide with roadmap, concepts, and code examples'
      }
    }
  }
};

export const QuickStart: Story = {
  args: {
    title: '🚀 Quick Start',
    content: quickStartGuide
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick reference guide for getting started with the virtualization component'
      }
    }
  }
};
