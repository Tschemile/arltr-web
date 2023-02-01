import React, { useState } from 'react';

import Button from '@/components/common/Button';
import BulletList from '@/components/Icons/BulletList';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Heart from '@/components/Icons/Heart';
import SolidHeart from '@/components/Icons/Heart/solid';
import Lock from '@/components/Icons/Lock';
import Message from '@/components/Icons/Message';
import PlusIcon from '@/components/Icons/PlusIcon';
import { getListFriend, makeRelation, updateRelation } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';

interface OptionProps {
  isFollowing: Record<string, string>;
  id: string;
  isCurrentUser: boolean;
  isFriend: Record<string, string>;
}

function OptionAction(props: OptionProps) {
  const dispatch = useAppDispatch();
  const {
    isFollowing = {},
    id = '',
    isCurrentUser = false,
    isFriend = {},
  } = props;
  const [friend, setFriend] = useState(Object.keys(isFriend).length === 0);
  const [following, setFollowing] = useState(
    Object.keys(isFollowing).length === 0
  );

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
                dispatch(makeRelation({ user: id, type: 'FOLLOW' }));
                setFollowing(false);
              }}
            >
              <Heart />
              Follow
            </Button>
          ) : (
            <Button
              className="ml-1"
              onSubmit={() =>
                dispatch(getListFriend({ type: 'FOLLOWING' })).then((x) => {
                  if (x.payload) {
                    dispatch(
                      updateRelation({
                        id: x.payload.relations.find(
                          (y: any) => y.user.id === id
                        ).id,
                        action: 'DELETE',
                      })
                    );
                    setFollowing(true);
                  }
                })
              }
            >
              <SolidHeart color="pink" />
              Following
            </Button>
          )}

          {friend ? (
            <Button
              className="ml-1 bg-gray-600"
              onSubmit={() => {
                dispatch(makeRelation({ user: id, type: 'FRIEND' }));
                setFriend(false);
              }}
            >
              <PlusIcon />
              Add friend
            </Button>
          ) : (
            <Button
              className="ml-1 bg-gray-600"
              onSubmit={() =>
                dispatch(getListFriend({ type: 'FRIEND' })).then((x) => {
                  if (x.payload) {
                    dispatch(
                      updateRelation({
                        id: x.payload.relations.find(
                          (y: any) => y.user.id === id
                        ).id,
                        action: 'DELETE',
                      })
                    );
                    setFriend(true);
                  }
                })
              }
            >
              <Lock />
              Unfriend
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
                  <a
                    onClick={() =>
                      dispatch(makeRelation({ user: id, type: 'BLOCKED' }))
                    }
                  >
                    Block this person
                  </a>
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
