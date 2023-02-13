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
import { changeRelation } from '@/redux/actions';
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

  const checkFriend = Object.keys(isFriend).length === 0;
  const checkFollowing = Object.keys(isFollowing).length === 0;
  const [friend, setFriend] = useState(!isRequest && checkFriend);
  const [requested, setRequested] = useState(isRequested && !checkFriend);
  const [following, setFollowing] = useState(checkFollowing);

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
                  changeRelation({
                    user: id,
                    type: 'FRIEND',
                    status: 'ACCEPTED',
                  })
                )
                  .unwrap()
                  .then(() => {
                    setFriend(false);
                    setRequested(false);
                  });
              },
            },
            {
              id: '2',
              title: 'Reject',
              handleClick: () => {
                dispatch(
                  changeRelation({
                    user: id,
                    type: 'FRIEND',
                    status: 'REJECT',
                  })
                )
                  .unwrap()
                  .then(() => {
                    setFriend(true);
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
    return friend ? (
      <Button
        className=" bg-gray-600"
        onSubmit={() => {
          dispatch(
            changeRelation({
              user: id,
              type: 'FRIEND',
              status: 'REQUESTING',
            })
          )
            .unwrap()
            .then(() => {
              setFriend(false);
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
    );
  };

  useEffect(() => {
    if (!checkFollowing) setFollowing(false);
    if (isRequest && checkFriend) setFriend(false);
    if (isRequested && !checkFriend) setRequested(true);
    return () => {
      setFollowing(true);
      setFriend(true);
      setRequested(true);
    };
  }, [checkFollowing, checkFriend, isRequest, isRequested]);

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
