import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import BulletList from '@/components/Icons/BulletList';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Heart from '@/components/Icons/Heart';
import SolidHeart from '@/components/Icons/Heart/solid';
import Lock from '@/components/Icons/Lock';
import Message from '@/components/Icons/Message';
import PlusIcon from '@/components/Icons/PlusIcon';
import { changeRelation } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';

interface OptionProps {
  isFollowing: Record<string, string>;
  id: string;
  isCurrentUser: boolean;
  isRequest: boolean;
  isFriend: Record<string, string>;
}

function OptionAction(props: OptionProps) {
  const dispatch = useAppDispatch();
  const {
    isFollowing = {},
    id = '',
    isCurrentUser = false,
    isFriend = {},
    isRequest = false,
  } = props;

  const checkFriend = Object.keys(isFriend).length === 0;
  const checkFollowing = Object.keys(isFollowing).length === 0;
  const [friend, setFriend] = useState(!isRequest && checkFriend);
  const [following, setFollowing] = useState(checkFollowing);

  useEffect(() => {
    if (!checkFollowing) setFollowing(false);
    if (isRequest && checkFriend) setFriend(false);
    return () => {
      setFollowing(true);
      setFriend(true);
    };
  }, [checkFollowing, checkFriend, isRequest]);

  return (
    <div className="flex">
      {isCurrentUser ? (
        <div className="flex items-center text-sm">
          <Button>
            <PlusIcon /> Add your story
          </Button>
          <div className="ml-1">
            <Button background="secondary">
              <BulletList />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-sm">
          <Button className="bg-gray-600">
            <Message />
            Chat
          </Button>

          {following ? (
            <Button
              className="ml-1"
              onSubmit={() => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FOLLOW',
                    status: 'ACCEPTED',
                  })
                );
                setFollowing(false);
              }}
            >
              <Heart />
              Follow
            </Button>
          ) : (
            <Button
              className="ml-1 text-pink-200"
              onSubmit={() => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FOLLOW',
                    status: 'REJECT',
                  })
                );
                setFollowing(true);
              }}
            >
              <SolidHeart color="pink" />
              Following
            </Button>
          )}

          {friend ? (
            <Button
              className="ml-1 bg-gray-600"
              onSubmit={() => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FRIEND',
                    status: 'REQUESTING',
                  })
                );
                setFriend(false);
              }}
            >
              <PlusIcon />
              Add friend
            </Button>
          ) : (
            <Button
              className="ml-1 bg-gray-600"
              onSubmit={() => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FRIEND',
                    status: 'REJECT',
                  })
                );
                setFriend(true);
              }}
            >
              <Lock />
              {isRequest || !friend ? 'Cancel request' : 'Unfriend'}
            </Button>
          )}
        </div>
      )}
      <div className="group flex flex-col">
        <div className="ml-1">
          <Button background="secondary">
            <EllipsisHorizon />
          </Button>
        </div>
        <div>
          <ul className="absolute z-[2] hidden w-52 bg-white p-2 group-hover:block">
            {isCurrentUser ? (
              <li>
                <a href="#"> View as guest </a>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() =>
                      dispatch(
                        changeRelation({
                          user: id,
                          type: 'BLOCKED',
                          status: 'ACCEPTED',
                        })
                      )
                    }
                  >
                    Block this person
                  </button>
                </li>
                <li>
                  <a href="#"> Report abuse</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OptionAction;
