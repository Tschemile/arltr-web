import React, { useState } from 'react';

import ArrowPointingOut from '@/components/Icons/ArrowPointingOut';
import Rotate from '@/components/Icons/Rotate';
import ZoomIn from '@/components/Icons/ZoomIn';
import ZoomOut from '@/components/Icons/ZoomOut';

interface PreviewProps {
  open: boolean;
  setOpen: () => void;
}

export default function PreviewPost(props: PreviewProps) {
  const { open = false, setOpen = () => {} } = props;
  const [show, setShow] = useState(true);
  const [scaleImg, setScaleImg] = useState<number>(0.75);
  const [rotateImg, setRotateImg] = useState<number>(0);
  return open ? (
    <div className="fixed inset-0 z-40 w-full overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center transition-all sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between overflow-hidden transition-all">
          <div className="relative h-full min-h-screen w-full">
            <div
              className={`fixed top-0 z-50 flex min-w-full ${
                show ? 'sm:min-w-[calc(100%-300px)]' : 'sm:min-w-full'
              } justify-between bg-pink-900 p-2 text-white transition-all`}
            >
              <div></div>
              <div className="flex">
                <button onClick={() => setScaleImg(scaleImg + 0.25)}>
                  <ZoomIn />
                </button>
                <button
                  onClick={() => setScaleImg(scaleImg - 0.25)}
                  className="disabled:opacity-50"
                  disabled={scaleImg === 0.25}
                >
                  <ZoomOut />
                </button>
                <button onClick={() => setRotateImg(rotateImg + 90)}>
                  <Rotate />
                </button>
                <button
                  className="hidden sm:block"
                  onClick={() => {
                    setShow(!show);
                    if (show) setScaleImg(1);
                    else setScaleImg(0.75);
                  }}
                >
                  <ArrowPointingOut />
                </button>
              </div>
            </div>
            <div
              className={`absolute top-1/2 left-1/2 m-auto inline-block h-screen w-screen ${
                show ? 'sm:w-[calc(100vw-300px)]' : 'sm:w-screen'
              } -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden text-left transition-all sm:align-middle`}
            >
              <div className="relative h-full min-h-[50vh] w-full min-w-fit">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={setOpen}
                >
                  <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <img
                  src="https://i.pinimg.com/originals/99/fa/39/99fa392c68b57c46d579a977413b2925.jpg"
                  className={`absolute top-1/2 right-0 left-1/2 bottom-0 h-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-all`}
                  alt="image"
                  style={{
                    transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(${rotateImg}deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(${scaleImg}) scaleY(${scaleImg})`,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`z-50 hidden min-h-screen w-full max-w-[300px] bg-white ${
              show ? 'sm:block' : 'sm:hidden'
            }`}
          >
            haha
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
