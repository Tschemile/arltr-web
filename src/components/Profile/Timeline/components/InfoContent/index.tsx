import type { ReactNode } from 'react';

interface InfoContentProps {
  icon: ReactNode;
  content: string | undefined;
  isLink?: boolean;
}

const InfoContent = (props: InfoContentProps) => {
  const { icon = '', content = '', isLink = false } = props;
  return (
    <div className="mb-4 flex items-center break-all text-sm">
      {icon}
      {isLink ? (
        <a href={content} className="pl-2">
          {content}
        </a>
      ) : (
        <span className="pl-2">{content}</span>
      )}
    </div>
  );
};

export default InfoContent;
