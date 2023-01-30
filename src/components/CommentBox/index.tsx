import React from 'react';

import Avatar from '../common/Avatar';
import EllipsisHorizon from '../Icons/EllipsisHorizon';

interface IComment {
  item: Record<string, string>;
}

export default function CommentBox(props: IComment) {
  const { item = {} } = props;
  const { image = '', user = {}, content = '' } = item;
  const { name = '' } = user as Record<string, string>;
  return (
    <div className="group flex items-center py-2">
      <div className="mr-4 h-[40px] w-[40px]">
        <Avatar
          src={image}
          alt="avatar"
          className="m-auto h-full w-full rounded-full"
        />
      </div>
      <div className="relative rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="whitespace-pre-line text-sm">{content}</p>
      </div>
      <div className="hidden group-hover:block ">
        <EllipsisHorizon />
      </div>
    </div>
  );
}
