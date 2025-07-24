import React from 'react'
import type { VirtualisedProps } from './types'
import PerformanceMonitor from './PerformanceMonitor'

function Virtualised<T = any>({ 
  items, 
  itemHeight, 
  height, 
  width = '100%',
  renderItem, 
  buffer = 5,
  onScroll,
  className,
  style 
}: VirtualisedProps<T>) {
  return (
    <div 
      className={className}
      style={{ 
        height, 
        width, 
        border: '2px dashed #007bff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '18px',
        color: '#666',
        position: 'relative',
        ...style 
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '16px' }}>
        🚀 Virtualized List
      </div>
      <div style={{ textAlign: 'center', lineHeight: '1.5' }}>
        <div>Ready for implementation</div>
        <div style={{ fontSize: '14px', marginTop: '8px' }}>
          {items.length.toLocaleString()} items • {itemHeight}px height • {buffer} buffer
        </div>
      </div>
      
      {/* Show first few items as preview */}
      <div style={{ 
        marginTop: '20px', 
        maxWidth: '400px', 
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        {items.slice(0, 3).map((item, index) => (
          <div key={index} style={{ borderBottom: index < 2 ? '1px solid #eee' : 'none' }}>
            {renderItem(item, index)}
          </div>
        ))}
        <div style={{
          padding: '8px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          backgroundColor: '#f9f9f9'
        }}>
          ... and {(items.length - 3).toLocaleString()} more items
        </div>
      </div>
    </div>
  )
}

export default Virtualised
