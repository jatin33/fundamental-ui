import React, { useState, useEffect } from 'react';
import FPSStats from 'react-fps-stats';

interface PerformanceMonitorProps {
  /** Show/hide FPS monitor */
  showFPS?: boolean;
  /** Show/hide performance metrics */
  showMetrics?: boolean;
  /** Custom position for FPS counter */
  fpsPosition?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

interface PerformanceMetrics {
  memoryUsage: string;
  renderCount: number;
  scrollEvents: number;
  visibleItems: number;
  totalItems: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showFPS = true,
  showMetrics = true,
  fpsPosition = { top: 10, left: 10 }
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: '0 MB',
    renderCount: 0,
    scrollEvents: 0,
    visibleItems: 0,
    totalItems: 0
  });

  const updateMemoryUsage = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const used = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      const total = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
      setMetrics(prev => ({
        ...prev,
        memoryUsage: `${used}/${total} MB`
      }));
    }
  };

  useEffect(() => {
    if (showMetrics) {
      const interval = setInterval(updateMemoryUsage, 1000);
      return () => clearInterval(interval);
    }
  }, [showMetrics]);

  const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
    setMetrics(prev => ({ ...prev, ...newMetrics }));
  };

  return (
    <>
      {showFPS && (
        <div style={{
          position: 'fixed',
          ...fpsPosition,
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          <FPSStats />
        </div>
      )}
      
      {showMetrics && (
        <div style={{
          position: 'fixed',
          top: showFPS ? 70 : 10,
          left: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 9998,
          pointerEvents: 'none',
          minWidth: '200px'
        }}>
          <div><strong>Performance Metrics</strong></div>
          <div>Memory: {metrics.memoryUsage}</div>
          <div>Renders: {metrics.renderCount}</div>
          <div>Scroll Events: {metrics.scrollEvents}</div>
          <div>Visible Items: {metrics.visibleItems}</div>
          <div>Total Items: {metrics.totalItems}</div>
        </div>
      )}
    </>
  );
};

// Custom hook for performance tracking
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    scrollEvents: 0,
    visibleItems: 0,
    totalItems: 0
  });

  const incrementRenderCount = () => {
    setMetrics(prev => ({ ...prev, renderCount: prev.renderCount + 1 }));
  };

  const incrementScrollEvents = () => {
    setMetrics(prev => ({ ...prev, scrollEvents: prev.scrollEvents + 1 }));
  };

  const updateVisibleItems = (visible: number, total: number) => {
    setMetrics(prev => ({ ...prev, visibleItems: visible, totalItems: total }));
  };

  const resetMetrics = () => {
    setMetrics({
      renderCount: 0,
      scrollEvents: 0,
      visibleItems: 0,
      totalItems: 0
    });
  };

  return {
    metrics,
    incrementRenderCount,
    incrementScrollEvents,
    updateVisibleItems,
    resetMetrics
  };
};

export default PerformanceMonitor;
