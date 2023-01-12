import type { ReactNode } from 'react';
import React from 'react';

interface TabsContentProps {
  options: Record<string, string | ReactNode>[];
  active: string;
  className?: string;
}

export default function TabsContent(props: TabsContentProps) {
  const { options = [], active = '1', className = '' } = props;
  return (
    <div className={`mt-4 ${className}`}>
      {options.filter((x) => x.key === active)[0]?.content}
    </div>
  );
}
