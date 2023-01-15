import type { ReactNode } from 'react';
import React from 'react';

interface SkeletonProps {
  children: ReactNode;
  img?: string;
}

export default function Skeleton(props: SkeletonProps) {
  const { img = '' } = props;
  return <>hihi</>;
}
