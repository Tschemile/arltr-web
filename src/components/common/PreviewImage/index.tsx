import type { ReactNode } from 'react';
import React from 'react';
import { PhotoProvider } from 'react-photo-view';

import Rotate from '@/components/Icons/Rotate';
import ZoomIn from '@/components/Icons/ZoomIn';
import ZoomOut from '@/components/Icons/ZoomOut';

interface IPreviewImage {
  children: ReactNode;
}

export default function PreviewImage(props: IPreviewImage) {
  return (
    <PhotoProvider
      maskOpacity={0.5}
      // photoWrapClassName="!w-[calc(100%-300px)]"
      // photoClassName="!w-1/2"
      // overlayRender={() => {
      //   return (
      //     <div className="absolute right-0 bottom-0 z-50 h-full min-w-[300px] bg-white p-2 text-sm text-black">
      //       Hehe
      //     </div>
      //   );
      // }}
      toolbarRender={({ rotate, onRotate, scale, onScale }) => {
        return (
          <>
            <div
              className="cursor-pointer"
              onClick={() => onRotate(rotate + 90)}
            >
              <Rotate />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => onScale(scale + 0.5)}
            >
              <ZoomIn />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => onScale(scale - 0.5)}
            >
              <ZoomOut />
            </div>
          </>
        );
      }}
    >
      {props.children}
    </PhotoProvider>
  );
}
