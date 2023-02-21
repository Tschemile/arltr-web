import type { ReactNode } from 'react';

export interface SkeletonProps {
  children: ReactNode;
  loading: boolean;
}

export { default as Sidebar } from './SidebarSkeleton';
