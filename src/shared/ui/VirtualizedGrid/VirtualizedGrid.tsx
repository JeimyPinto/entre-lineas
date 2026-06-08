'use client';

import { useMemo } from 'react';
import { Grid } from 'react-window';
import styles from './VirtualizedGrid.module.css';

interface VirtualizedGridProps<T> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
  columnCount?: number;
  itemHeight?: number;
  itemWidth?: number;
  className?: string;
  overscanCount?: number;
  emptyMessage?: string;
}

export default function VirtualizedGrid<T>({
  items,
  children,
  columnCount = 3,
  itemHeight = 300,
  itemWidth = 300,
  className = '',
  overscanCount = 5,
  emptyMessage = 'No hay elementos para mostrar.',
}: VirtualizedGridProps<T>) {
  const rowCount = useMemo(
    () => Math.ceil(items.length / columnCount),
    [items.length, columnCount]
  );

  if (items.length === 0) {
    return (
      <div className={`${styles.emptyState} ${className}`}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const Cell = useMemo(
    () => ({ columnIndex, rowIndex, style, ariaAttributes }: { columnIndex: number; rowIndex: number; style: React.CSSProperties; ariaAttributes: { 'aria-colindex': number; role: 'gridcell' } }) => {
      const index = rowIndex * columnCount + columnIndex;
      if (index >= items.length) return null;
      return (
        <div style={style} className={styles.cell} {...ariaAttributes}>
          {children(items[index], index)}
        </div>
      );
    },
    [items, children, columnCount]
  );

  return (
    <div className={`${styles.container} ${className}`} style={{ height: rowCount * itemHeight, width: '100%' }}>
      <Grid
        columnCount={columnCount}
        columnWidth={itemWidth}
        rowCount={rowCount}
        rowHeight={itemHeight}
        overscanCount={overscanCount}
        cellComponent={Cell}
        cellProps={{}}
      >
      </Grid>
    </div>
  );
}