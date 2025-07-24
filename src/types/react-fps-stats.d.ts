declare module 'react-fps-stats' {
  import React from 'react';

  interface FPSStatsProps {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }

  const FPSStats: React.FC<FPSStatsProps>;
  export default FPSStats;
}
