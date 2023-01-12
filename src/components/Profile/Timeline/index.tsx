import React from 'react';

import Avatar from '@/components/common/Avatar';

export default function Timeline() {
  return (
    <div className="bg-white">
      <div>
        <Avatar
          src=""
          alt="avatar"
          width={125}
          height={125}
          className="border-[3px] border-solid border-white"
        />
        <p>What</p>
      </div>
    </div>
  );
}
