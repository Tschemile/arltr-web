import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import BulletList from '@/components/Icons/BulletList';
import Earth from '@/components/Icons/Earth';
import EllipsisHorizon from '@/components/Icons/EllipsisHorizon';
import Heart from '@/components/Icons/Heart';
import SolidHeart from '@/components/Icons/Heart/solid';
import Lock from '@/components/Icons/Lock';
import Message from '@/components/Icons/Message';
import PlusIcon from '@/components/Icons/PlusIcon';
import { changeRelation, setFriendship } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';

interface OptionProps {
  isFollowing: Record<string, string>;
  id: string;
  isCurrentUser: boolean;
  isRequest: boolean;
  isRequested: boolean;
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
    isRequested = false,
  } = props;

  const checkUnfriend = Object.keys(isFriend).length === 0;
  const checkUnfollow = Object.keys(isFollowing).length === 0;
  const [makeFriend, setMakeFriend] = useState(!isRequest && checkUnfriend);
  const [requested, setRequested] = useState(isRequested && !checkUnfriend);
  const [following, setFollowing] = useState(checkUnfollow);
  const [friendRejected, setFriendRejected] = useState(true);

  const action = () => {
    if (requested)
      return (
        <Dropdown
          content={[
            {
              id: '1',
              title: 'Accept',
              handleClick: () => {
                dispatch(
                  setFriendship({
                    user: id,
                    status: 'ACCEPTED',
                  })
                )
                  .unwrap()
                  .then(() => {
                    setMakeFriend(false);
                    setRequested(false);
                    setFriendRejected(false);
                  });
              },
            },
            {
              id: '2',
              title: 'Reject',
              handleClick: () => {
                dispatch(
                  setFriendship({
                    user: id,
                    status: 'REJECT',
                  })
                )
                  .unwrap()
                  .then(() => {
                    setMakeFriend(true);
                    setRequested(false);
                  });
              },
            },
          ]}
        >
          <Button>
            <Earth className="fill-sky-600" />
            Respond
          </Button>
        </Dropdown>
      );
    return makeFriend ? (
      <Button
        className=" bg-gray-600"
        onSubmit={() => {
          dispatch(
            setFriendship({
              user: id,
              status: 'REQUESTING',
            })
          )
            .unwrap()
            .then(() => {
              setMakeFriend(false);
            });
        }}
      >
        <PlusIcon />
        Add friend
      </Button>
    ) : (
      <Button
        className=" bg-gray-600"
        onSubmit={() => {
          dispatch(
            setFriendship({
              user: id,
              status: 'REJECT',
            })
          )
            .unwrap()
            .then(() => {
              setMakeFriend(true);
              setFriendRejected(true);
            });
        }}
      >
        <Lock />
        {(isRequest || checkUnfriend) && friendRejected
          ? 'Cancel request'
          : 'Unfriend'}
      </Button>
    );
  };

  useEffect(() => {
    if (!checkUnfollow) setFollowing(false);
    if ((isRequest && checkUnfriend) || !checkUnfriend) setMakeFriend(false);
    if (isRequested && checkUnfriend) setRequested(true);
    return () => {
      setFollowing(true);
      setMakeFriend(true);
      setRequested(false);
    };
  }, [checkUnfollow, checkUnfriend, isRequest, isRequested]);

  return (
    <div className="flex">
      {isCurrentUser ? (
        <div className="flex items-center text-sm">
          <Button>
            <PlusIcon /> Add your story
          </Button>
          <div className="ml-1">
            <Button className="bg-gray-400">
              <BulletList />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-1 text-sm">
          <Button className="bg-gray-600">
            <Message />
            Chat
          </Button>

          {following ? (
            <Button
              onSubmit={() => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FOLLOW',
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
              className="text-pink-200"
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

          {action()}
        </div>
      )}
      <div className="group flex flex-col">
        <div className="ml-1">
          <Button className="bg-gray-400">
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
