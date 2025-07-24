export interface VirtualisedProps<T = any> {
  /** Array of items to virtualize */
  items: T[];
  
  /** Height of each item in pixels (fixed height for now) */
  itemHeight: number;
  
  /** Height of the viewport container */
  height: number;
  
  /** Width of the viewport container (optional) */
  width?: number | string;
  
  /** Function to render each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  
  /** Number of items to render outside visible area (buffer) */
  buffer?: number;
  
  /** Callback when scroll position changes */
  onScroll?: (scrollTop: number, scrollLeft?: number) => void;
  
  /** Custom class name for container */
  className?: string;
  
  /** Custom styles for container */
  style?: React.CSSProperties;
  
  /** Enable horizontal scrolling */
  horizontal?: boolean;
  
  /** Item width for horizontal scrolling */
  itemWidth?: number;
}

export interface VirtualScrollState {
  /** Current scroll position */
  scrollTop: number;
  
  /** Index of first visible item */
  startIndex: number;
  
  /** Index of last visible item */
  endIndex: number;
  
  /** Items currently being rendered */
  visibleItems: any[];
  
  /** Total height of all items */
  totalHeight: number;
  
  /** Offset for positioning visible items */
  offsetY: number;
}

export interface ViewportDimensions {
  height: number;
  width: number;
  scrollTop: number;
  scrollLeft: number;
}

export interface ItemPosition {
  index: number;
  top: number;
  height: number;
}
