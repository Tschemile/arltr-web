import React, { useRef, useState } from 'react';

import Preview from './Preview';

interface IPreviewPost {
  children: React.ReactNode;
}

const PreviewPost = (props: IPreviewPost) => {
  const [modal, setModal] = useState(false);
  const refs = useRef(null);
  // const childElement = React.findDOMNode(refs.childElement);
  // console.log('🚀 ~ childElement', childElement);

  const srcImages = React.Children.map(props.children, (child) => {
    if (child?.type === 'img') {
      return child.props.src;
    }
    return null;
  });
  // console.log('🚀 ~ srcImages', srcImages, props.children);

  return (
    <div>
      <div ref={refs} onClick={() => setModal(true)}>
        {props.children}
      </div>
      <Preview
        visible={modal}
        onClose={() => setModal(false)}
        data={srcImages}
      />
    </div>
  );
};

export default PreviewPost;
