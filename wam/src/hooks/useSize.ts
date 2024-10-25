import { useEffect } from 'react';
import { setSize as wamSetSize } from '../utils/wam';

interface Size {
  width: number;
  height: number;
}

export function useSize(size: Size) {
  useEffect(() => {
    console.log(`Setting size to: ${size.width}x${size.height}`);
    wamSetSize(size.width, size.height); 
  }, [size.width, size.height]);
}
