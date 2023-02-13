import React, { useEffect, useState } from 'react';
import { PhotoView } from 'react-photo-view';

import CardPost from '@/components/CardPost';
import Block from '@/components/common/Block';
import PreviewImage from '@/components/common/PreviewImage';
import CreatePost from '@/components/CreatePost';
import Earth from '@/components/Icons/Earth';
import Eye from '@/components/Icons/Eye';
import Group from '@/components/Icons/Group';
import Lock from '@/components/Icons/Lock';
import { getProfileListPosts } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function NewFeeds() {
  const dispatch = useAppDispatch();
  const currentGroup = useAppSelector((state) => state.groups.currentGroup);
  const {
    description = '',
    mode: modeProps = '',
    id: groupId = '',
  } = currentGroup;

  const listComments = useAppSelector((state) => state.comments.listComment);
  const listPostsProps = useAppSelector((state) => state.posts.listPosts);

  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState('');
  const [listPosts, setListPosts] = useState<Record<string, string>[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdEdit, setPostIdEdit] = useState('');
  const [fileDataURL, setFileDataURL] = useState<string[]>([]);
  const [mode, setMode] = useState('PUBLIC');

  console.log(openModal, content, isEdit, postIdEdit, fileDataURL, mode);

  const getUIByMode = () => {
    switch (modeProps) {
      case 'PUBLIC':
        return (
          <div className="flex items-start gap-2">
            <Earth />
            <div>
              <strong>Public</strong>
              <p>Everyone can see all posts of this group</p>
            </div>
          </div>
        );
      case 'PRIVATE':
        return (
          <div className="flex items-start gap-2">
            <Lock />
            <div>
              <strong>Private</strong>
              <p>Just member of group can see all posts of this group.</p>
            </div>
          </div>
        );
      case 'HIDDEN':
        return (
          <div className="flex items-start gap-2">
            <Eye />
            <div>
              <strong>Hidden</strong>
              <p>Only you can see all posts of this group. </p>
            </div>
          </div>
        );

      default:
        return '';
    }
  };

  useEffect(() => {
    if (groupId)
      dispatch(
        getProfileListPosts({
          type: 'POST',
          queryType: 'GROUP',
          limit: 10,
          group: groupId,
        })
      );
  }, [groupId]);

  useEffect(() => {
    setListPosts(listPostsProps as []);
  }, [JSON.stringify(listPostsProps)]);

  return (
    <div className="flex w-full flex-col-reverse gap-2 sm:grid md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <CreatePost />
        {listPosts.length <= 0 ? (
          <p className="text-center">Don&apos;t have any post! </p>
        ) : (
          (listPosts as Record<string, string>[]).map((x) => (
            <CardPost
              setIsEdit={setIsEdit}
              post={x}
              key={x.id}
              listComments={listComments}
              setOpenModal={setOpenModal}
              setContent={setContent}
              setPostIdEdit={setPostIdEdit}
              setListPosts={setListPosts}
              setFileDataURL={setFileDataURL}
              listPosts={listPosts}
              setMode={setMode}
              // isPersonPage={isCurrentUser}
            />
          ))
        )}
      </div>
      <div className="row-start-1 h-full md:row-start-auto">
        <Block title="Info" seeAll={false} showTotal={false}>
          <div className="mb-4 flex items-center break-all text-sm">
            <Group />
            <span className="pl-2">1 member</span>
          </div>
          <div className="flex items-center break-all text-sm">
            {getUIByMode()}
          </div>
        </Block>
        {description && (
          <Block title="About" seeAll={false} showTotal={false}>
            <p className="text-base">{description}</p>
          </Block>
        )}
        <Block
          title="New shared media files"
          seeAll={false}
          showTotal={false}
          total={0}
        >
          <div className="grid grid-cols-2 gap-2">
            <PreviewImage>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-full w-full overflow-hidden rounded"
                >
                  <PhotoView src="https://ss-images.saostar.vn/2017/06/04/1325225/tuhat-e1496585469861.jpg">
                    <img
                      className="h-full w-full cursor-pointer object-cover transition-all hover:scale-125"
                      src="https://ss-images.saostar.vn/2017/06/04/1325225/tuhat-e1496585469861.jpg"
                      alt="newFileShared"
                    />
                  </PhotoView>
                </div>
              ))}
            </PreviewImage>
          </div>
        </Block>
      </div>
    </div>
  );
}
