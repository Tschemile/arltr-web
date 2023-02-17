import React, { useState } from 'react';

import Preview from './Preview';

interface IPreviewPost {
  data: string[] | string | undefined;
  isPost?: boolean;
  classNameImg?: string;
}

const PreviewPost = (props: IPreviewPost) => {
  const { data = [], isPost = false, classNameImg = '' } = props;
  const [modal, setModal] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);

  const srcImages = [...data];

  // const srcImages = React.Children.map(Imgchildren, (child) => {
  //   if (child?.type === 'img') {
  //     return child.props.src;
  //   }
  //   return null;
  // });

  const getLayout = () => {
    if (srcImages.length <= 2) {
      return (srcImages as []).map((x: string) => (
        <div
          key={x}
          className="mb-2 h-[150px] max-h-[185px] min-h-[300px] cursor-pointer overflow-hidden rounded"
        >
          <img className="h-full w-full object-cover" src={x} alt="post-img" />
        </div>
      ));
    }

    return (
      <div className="relative">
        <div className="relative max-h-[185px] min-h-[300px] overflow-hidden rounded">
          <img
            className="h-full w-full cursor-pointer rounded object-cover"
            src={srcImages[0] as string | undefined}
            alt="post-img"
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <img
            className="h-full w-full cursor-pointer rounded object-cover"
            src={srcImages[1] as string | undefined}
            alt="post-img"
          />
          <img
            className="h-full w-full cursor-pointer rounded object-cover"
            src={srcImages[2] as string | undefined}
            alt="post-img"
          />
        </div>
        {srcImages.length > 3 && (
          <div className="absolute bottom-0 right-0 rounded bg-[rgba(0,0,0,0.5)] p-4 text-white">
            + {srcImages.length - 3}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      <div
        className="h-full w-full"
        onClickCapture={(e: any) => {
          e.stopPropagation();
          if (e.target.localName === 'img') {
            setModal(true);
            setIndexSelected(
              typeof data === 'string' ? 0 : srcImages.indexOf(e.target.src)
            );
          }
        }}
      >
        {isPost ? (
          getLayout()
        ) : (
          <img
            className={`h-full w-full cursor-pointer object-cover ${classNameImg}`}
            src={typeof data === 'string' ? data : ''}
            alt="img"
          />
        )}
      </div>
      <Preview
        visible={modal}
        showTotal={typeof data !== 'string'}
        onClose={() => setModal(false)}
        data={typeof data === 'string' ? [data] : srcImages}
        indexSelected={indexSelected}
      />
    </div>
  );
};

export default PreviewPost;
