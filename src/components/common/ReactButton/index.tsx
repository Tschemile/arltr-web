import Image from 'next/image';
import type { ReactNode } from 'react';
import React from 'react';

import Angry from '@/assets/angry.png';
import Haha from '@/assets/haha.png';
import Heart from '@/assets/heart.png';
import Like from '@/assets/like.png';
import Cry from '@/assets/sad.png';
import Wow from '@/assets/wow.png';

import Tooltip from '../Tooltip';

interface IEmoji {
  type: 'Like' | 'Haha' | 'Heart' | 'Cry' | 'Wow' | 'Angry';
  value: 'LIKE' | 'HEART' | 'LAUGH' | 'CRY' | 'WOW' | 'ANGRY';
  onClick?: (value: string) => void;
}

interface IActionButton {
  icon: ReactNode;
  className?: string;
  text: string;
  iconClassname?: string;
  onClick?: (value: string) => void;
}

function Emoji(props: IEmoji) {
  const { type = 'like', onClick = () => {}, value = 'LIKE' } = props;
  const getEmoji = () => {
    switch (type) {
      case 'Like':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Like}
            alt="like"
            onClick={() => onClick(value)}
          />
        );
      case 'Haha':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Haha}
            alt="haha"
            onClick={() => onClick(value)}
          />
        );
      case 'Heart':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Heart}
            alt="heart"
            onClick={() => onClick(value)}
          />
        );
      case 'Cry':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Cry}
            alt="cry"
            onClick={() => onClick(value)}
          />
        );
      case 'Wow':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Wow}
            alt="wow"
            onClick={() => onClick(value)}
          />
        );
      case 'Angry':
        return (
          <Image
            className="cursor-pointer hover:animate-bounce"
            width={40}
            height={40}
            src={Angry}
            alt="angry"
            onClick={() => onClick(value)}
          />
        );

      default:
        return '';
    }
  };
  return (
    <Tooltip description={type} direction="top">
      {getEmoji()}
    </Tooltip>
  );
}

export default function ReactButton(props: IActionButton) {
  const {
    icon = '',
    className = '',
    onClick = () => {},
    text = '',
    iconClassname = '',
  } = props;
  return (
    <div className={`nav-item ${className}`}>
      <span className={iconClassname}>{icon}</span>
      <p className="whitespace-nowrap pl-2 text-base text-[#929292]">{text}</p>
      <div className=" invisible absolute top-[-52px] opacity-0 transition-all duration-200 group-hover/item:visible group-hover/item:opacity-100">
        <div className="flex items-center gap-2 rounded-full bg-primary-color px-4 py-2">
          <Emoji type="Like" value="LIKE" onClick={onClick} />
          <Emoji type="Heart" value="HEART" onClick={onClick} />
          <Emoji type="Haha" value="LAUGH" onClick={onClick} />
          <Emoji type="Cry" value="CRY" onClick={onClick} />
          <Emoji type="Wow" value="WOW" onClick={onClick} />
          <Emoji type="Angry" value="ANGRY" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
