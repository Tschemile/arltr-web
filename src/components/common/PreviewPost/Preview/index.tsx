import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import ArrowLeft from '@/components/Icons/ArrowLeft';
import ArrowPointingOut from '@/components/Icons/ArrowPointingOut';
import ArrowRight from '@/components/Icons/ArrowRight';
import Rotate from '@/components/Icons/Rotate';
import ZoomIn from '@/components/Icons/ZoomIn';
import ZoomOut from '@/components/Icons/ZoomOut';

interface PreviewProps {
  visible: boolean;
  onClose: () => void;
  data: any[] | undefined | null;
  indexSelected: number;
  showTotal?: boolean;
}

interface ImageComponentProps {
  src: string;
  rotateImg: number;
  scaleImg: number;
}

const ImgComponent = (props: ImageComponentProps) => {
  const { rotateImg, scaleImg, src } = props;
  const refImg = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  const handleDrag = (e: React.PointerEvent<HTMLImageElement>) => {
    if (pressed && refImg.current)
      setTranslate({
        x: translate.x + e.movementX,
        y: translate.y + e.movementY,
      });
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDragUp = () => {
    setTranslate({
      x: 0,
      y: 0,
    });
  };
  useEffect(() => {
    return () => {
      setTranslate({ x: 0, y: 0 });
      setPressed(false);
    };
  }, []);

  return (
    <img
      src={src}
      className={`${
        pressed ? 'cursor-grabbing' : 'cursor-grab'
      } absolute top-1/2 right-0 left-1/2 bottom-0 h-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-75 ease-in-out`}
      alt="image"
      ref={refImg}
      style={{
        transform: `translate(calc(-50% + ${translate.x}px), calc(-50% + ${translate.y}px)) rotate(${rotateImg}deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(${scaleImg}) scaleY(${scaleImg})`,
      }}
      draggable={false}
      onMouseDown={(e) => {
        setPressed(true);
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseUp={(e) => {
        setPressed(false);
        if (scaleImg < 1.25) handleDragUp();
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseLeave={(e) => {
        setPressed(false);
        if (scaleImg < 1.25) handleDragUp();
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseMove={handleDrag}
    />
  );
};

export default function Preview(props: PreviewProps) {
  const {
    visible = false,
    onClose = () => {},
    data = [],
    indexSelected = 0,
    showTotal = true,
  } = props;

  const [show, setShow] = useState(true);
  const [scaleImg, setScaleImg] = useState<number>(0.75);
  const [rotateImg, setRotateImg] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(indexSelected);

  const refs = data?.reduce((acc, _val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToSmooth = (i: number) => {
    refs[i].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
    setCurrentSlide(i);
  };

  const dataLength = data!.length || 0;

  const nextSlide = () => {
    if (currentSlide >= dataLength - 1) {
      scrollToSmooth(0);
    } else {
      scrollToSmooth(currentSlide + 1);
      setRotateImg(0);
      if (!show) setScaleImg(1);
      else setScaleImg(0.75);
    }
  };

  const prevSlide = () => {
    const newSlide = currentSlide === 0 ? dataLength - 1 : currentSlide - 1;
    scrollToSmooth(newSlide);
    setRotateImg(0);
    if (!show) setScaleImg(1);
    else setScaleImg(0.75);
  };

  const arrowStyle =
    'absolute bg-white drop-shadow text-2xl z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = (isLeft: Boolean = false) => (
    <button
      type="button"
      onClick={isLeft ? prevSlide : nextSlide}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
    >
      {isLeft ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    if (visible) {
      if (indexSelected) setCurrentSlide(indexSelected);
      document.body.className = 'overflow-hidden';
    }
    return () => {
      setShow(true);
      setRotateImg(0);
      setScaleImg(0.75);
      setCurrentSlide(0);
      document.body.className = '';
    };
  }, [visible]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return visible ? (
    <div className="fixed inset-0 z-40 w-full overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center transition-all sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between overflow-hidden transition-all">
          <div className="relative inline-flex h-full min-h-screen w-full items-center overflow-x-hidden">
            <div
              className={`fixed top-0 z-50 flex min-w-full ${
                show ? 'sm:min-w-[calc(100%-300px)]' : 'sm:min-w-full'
              } justify-between text-white transition-all`}
            >
              <div className="flex space-x-3 p-1">
                <div
                  onClick={onClose}
                  className="cursor-pointer rounded-full px-2 "
                >
                  X
                </div>
                {showTotal && (
                  <span>
                    {currentSlide + 1}/{data?.length || 1}
                  </span>
                )}
              </div>
              <div
                className="w-full opacity-0 transition-opacity"
                onClick={onClose}
              />
              <div className="flex p-1">
                <button
                  onClick={() => setScaleImg(scaleImg + 0.25)}
                  className="disabled:opacity-50"
                  disabled={scaleImg === 5}
                >
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
                    if (show) setScaleImg(1);
                    else setScaleImg(0.75);
                    setShow(!show);
                  }}
                >
                  <ArrowPointingOut />
                </button>
              </div>
            </div>
            {currentSlide !== 0 && sliderControl(true)}
            <div
              className="relative h-full min-h-screen w-full"
              key={currentSlide}
              ref={refs[currentSlide]}
            >
              <div
                className={`absolute top-1/2 left-1/2 m-auto inline-block h-screen w-screen ${
                  show ? 'sm:w-[calc(100vw-300px)]' : 'sm:w-screen'
                } -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden text-left transition-all sm:align-middle`}
              >
                <div className="relative h-full min-h-[50vh] w-full min-w-fit">
                  <div
                    className="fixed inset-0 transition-opacity"
                    onClick={onClose}
                  >
                    <div className="absolute inset-0 bg-gray-900 opacity-95" />
                  </div>
                  <ImgComponent
                    src={data![currentSlide]}
                    rotateImg={rotateImg}
                    scaleImg={scaleImg}
                  />
                </div>
              </div>
            </div>
            {currentSlide < dataLength - 1 && sliderControl()}
          </div>

          <div
            className={`z-50 hidden min-h-screen w-full max-w-[300px] bg-white ${
              show ? 'sm:block' : 'sm:hidden'
            }`}
          >
            Comment
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
