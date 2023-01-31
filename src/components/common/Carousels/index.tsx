/* eslint-disable no-plusplus */
import type { ReactNode } from 'react';
import React, { createRef, useState } from 'react';

import ArrowLeft from '@/components/Icons/ArrowLeft';
import ArrowRight from '@/components/Icons/ArrowRight';

interface CarouselsProps {
  children?: ReactNode | any;
  numSlide?: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function Carousels(props: CarouselsProps) {
  const { children, numSlide = 1 } = props;
  const carouselData = [...children];
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [paused, setPaused] = useState(false);

  const refs = carouselData?.reduce((acc, _val, i) => {
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

  const lem = carouselData!.length || 0;

  const nextSlide = () => {
    if (currentSlide >= lem - 1) {
      scrollToSmooth(0);
    } else {
      scrollToSmooth(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    const newSlide = currentSlide === 0 ? lem - 1 : currentSlide - 1;
    scrollToSmooth(newSlide);
  };

  const arrowStyle =
    'absolute bg-white drop-shadow text-2xl z-10 h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = (isLeft: Boolean = false) => (
    <button
      type="button"
      onClick={isLeft ? prevSlide : nextSlide}
      className={`${arrowStyle} ${isLeft ? 'left-0' : 'right-0'}`}
    >
      {isLeft ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );

  const show = {
    1: 'w-full',
    2: 'w-1/2',
    3: 'w-1/3',
    4: 'w-1/4',
    5: 'w-1/5',
    6: 'w-1/6',
  };

  // auto next slide
  // useEffect(() => {
  //   setInterval(() => {
  //     if (paused === false) {
  //       nextSlide();
  //     }
  //   }, 3000);
  // }, []);

  return (
    <div
      className="flex w-screen items-center justify-center p-12 md:w-1/2"
      // onMouseDown={() => setPaused(true)}
      // onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full">
        <div className="inline-flex overflow-x-hidden">
          {currentSlide !== 0 && sliderControl(true)}
          {carouselData?.map((val, i) => (
            <div
              className={`${show[numSlide]} shrink-0 object-contain text-center`}
              key={i}
              ref={refs[i]}
            >
              {val}
            </div>
          ))}
          {currentSlide < lem - numSlide && sliderControl()}
        </div>
      </div>
    </div>
  );
}
