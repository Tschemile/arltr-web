import Image from "next/image";
import router from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Angry from "@/assets/angry.png";
import Haha from "@/assets/haha.png";
import Heart from "@/assets/heart.png";
import LikeIcons from "@/assets/like.png";
import Cry from "@/assets/sad.png";
import Wow from "@/assets/wow.png";
import EllipsisHorizon from "@/components/Icons/EllipsisHorizon";
import Like from "@/components/Icons/Like";
import { POSTS, REACTION } from "@/constants/enum";
import {
  addComment,
  deletePost,
  getCommentsOfPost,
  getListReaction,
  makeReaction,
  uploadFile,
} from "@/redux/actions";
import type { IInfoUser, IReaction } from "@/redux/actions/Interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { timeSince } from "@/utils/func";

import ActionButton from "../common/ActionButton";
import Avatar from "../common/Avatar";
import Divider from "../common/Divider";
import Dropdown from "../common/Dropdown";
import IconButton from "../common/IconButton";
import Modal from "../common/Modal";
import PreviewPost from "../common/PreviewPost";
import ReactButton from "../common/ReactButton";
import Tabs from "../common/Tabs";
import TabsContent from "../common/Tabs/TabsContent";
import Tooltip from "../common/Tooltip";
import Comment from "../Icons/Comment";
import PencilSquare from "../Icons/PenciSquare";
import Trash from "../Icons/Trash";
import CommentsSkeleton from "../Skeleton/Comments";
import { ReactionSkeleton } from "../Skeleton/Reaction";
import CommentBox from "./components/CommentBox";
import CommentForm from "./components/CommentForm";

interface ICardPost {
  setIsEdit?: (value: boolean) => void;
  post?: Record<string, string>;
  listComments?: any[];
  setOpenModal?: (value: boolean) => void;
  setContent?: (value: string) => void;
  setPostIdEdit?: (value: string) => void;
  setListPosts?: (value: Record<string, string>[]) => void;
  listPosts?: Record<string, string>[];
  setFileDataURL?: (value: string[]) => void;
  setMode?: (value: string) => void;
  isPersonPage?: boolean;
  isFirstPost?: boolean;
}

interface IUsers {
  data?: IInfoUser[];
  total?: number;
}

const Users = (props: IUsers) => {
  const { data = [], total = 0 } = props;
  const isLoadingListReaction = useAppSelector(
    (state) => state.posts.loadingListRelations
  );
  if (isLoadingListReaction) return <ReactionSkeleton total={total} />;
  return (
    <>
      {data &&
        data.map((x) => {
          const {
            id = "",
            avatar = "",
            name = "",
            domain = "",
            gender = "",
          } = x;
          return (
            <div key={id} className="flex items-center py-2">
              <div
                className="mr-4 h-[45px] w-[45px] cursor-pointer"
                onClick={() => router.push(`/user/${domain}`)}
              >
                <Avatar
                  src={avatar}
                  alt="avatar"
                  width={50}
                  className="m-auto h-full w-full rounded-full"
                  gender={gender}
                />
              </div>
              <div className="">
                <h3
                  className="cursor-pointer text-lg font-medium"
                  onClick={() => router.push(`/user/${domain}`)}
                >
                  {name}
                </h3>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default function CardPost(props: ICardPost) {
  const dispatch = useAppDispatch();
  const refs = useRef<null>(null);
  const { LIKE, HEART, LAUGH, CRY, WOW, ANGRY } = REACTION.TYPE;
  const { PUBLIC, PRIVATE, FRIEND } = POSTS.MODE;
  const {
    post = {},
    listComments = [],
    setIsEdit = () => {},
    setOpenModal = () => {},
    setContent = () => {},
    setPostIdEdit = () => {},
    setListPosts = () => {},
    setFileDataURL = () => {},
    listPosts = [],
    setMode = () => {},
    isPersonPage = true,
    isFirstPost = false,
  } = props;

  const {
    author = {},
    images = [],
    totalComments: totalCommentsProps = 0,
    totalReacts: totalReactsProps = 0,
    id = "",
    createdAt: datePostProps = new Date(),
    content = "",
    react = {},
    mode: modeProps = PUBLIC,
  } = post;

  const { type: typeProps = "" } = react as Record<string, string>;

  const {
    name: authorName = "",
    gender: authorGender = "",
    avatar: authorAvatar = "",
    domain = "",
  } = author as Record<string, string>;

  const listTotalReaction = useAppSelector(
    (state) => state.posts.listReaction?.total
  );

  const listUsersReation = useAppSelector(
    (state) => state.posts.listReaction.users
  );

  const isLoadingListCmt = useAppSelector((state) => state.comments.isLoading);

  const [isClickedCmt, setIsClickedCmt] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [contentCmt, setContentCmt] = useState("");
  const [totalComments, setTotalComments] = useState(
    Number(totalCommentsProps)
  );
  const [limit, setLimit] = useState(2);
  const [isLiked, setIsLiked] = useState(false);
  const [totalReacts, setTotalReacts] = useState(0);
  const [isDeletedCmtID, setIsDeletedCmtID] = useState("");
  const [image, setImage] = useState("");
  const [emoji, setEmoji] = useState("");
  const [reactionModal, setReactionModal] = useState(false);
  const [tabsKey, setTabsKey] = useState("ALL");

  const getIconEmoji = (type: string) => {
    switch (type) {
      case LIKE:
        return <Image width={20} src={LikeIcons} alt="like" />;
      case HEART:
        return <Image width={20} src={Heart} alt="love" />;
      case LAUGH:
        return <Image width={20} src={Haha} alt="laugh" />;
      case WOW:
        return <Image width={20} src={Wow} alt="wow" />;
      case CRY:
        return <Image width={20} src={Cry} alt="cry" />;
      case ANGRY:
        return <Image width={20} src={Angry} alt="angry" />;
      default:
        return "All";
    }
  };

  const options = listTotalReaction
    ?.slice()
    .reverse()
    .map((x: Record<string, string>) => {
      return {
        key: x.type,
        title: (
          <div className="flex items-center gap-1">
            {getIconEmoji(String(x.type))} ({x.total})
          </div>
        ),
        content: <Users total={Number(x.total)} data={listUsersReation} />,
      };
    });

  const datePosts = new Date(datePostProps);
  const dateFormated = `${datePosts.getDate()}/${
    datePosts.getMonth() < 9
      ? `0${datePosts.getMonth() + 1}`
      : datePosts.getMonth()
  }/${datePosts.getFullYear()} at ${datePosts.getHours()}:${datePosts.getMinutes()}`;

  const timeCreated = Math.floor(new Date().getTime() - datePosts.getTime());

  const timeOfPosts = timeSince(timeCreated, dateFormated);

  const { id: currentUserId } = useAppSelector(
    (state) => state.auth.currentUser
  );

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0] as string | Blob);
      formData.append("scope", "HIDDEN");
      dispatch(uploadFile(formData)).then((res: any) => {
        const { payload: { status = 0, data = "" } = {} } = res;
        if (status === 201) {
          setImage(data.url);
        }
      });
    }
  };

  const getAllCommentsOfPost = (postId: string) => {
    if (totalComments > 0 && !isClickedCmt) {
      dispatch(getCommentsOfPost({ post: postId, limit }));
    }
    setIsClickedCmt(true);
    if (refs.current) (refs.current as any).focus();
  };

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContentCmt("");
    setImage("");
    if (contentCmt || image) {
      dispatch(addComment({ post: id, content: contentCmt, image })).then(
        (res) => {
          if (res.payload.comment) {
            setIsClickedCmt(true);
            dispatch(getCommentsOfPost({ post: id, limit }));
            setTotalComments(totalComments + 1);
          }
        }
      );
    }
  };

  const handleEditPost = () => {
    setOpenModal(true);
    setIsEdit(true);
    setContent(content);
    setFileDataURL(images as string[]);
    setPostIdEdit(id);
    setMode(modeProps);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(id)).then((res: any) => {
      if (res.payload.status === 200) {
        setListPosts(listPosts.filter((x) => x.id !== id));
        toast.success("Delete post success");
      }
    });
  };

  const handleLikePost = (type: string) => {
    setEmoji(type === emoji ? "" : type);
    dispatch(makeReaction({ post: id, type } as IReaction)).then((res: any) => {
      if (res.payload.status === 200) {
        dispatch(getListReaction({ post: id })).then((result: any) => {
          const { total: totalData = [], users = [] } = result.payload.data;
          const total = totalData.find(
            (x: Record<string, string>) => x.type === "ALL"
          );
          const find = users.find(
            (x: Record<string, string>) => x.id === currentUserId
          );
          setTotalReacts(Number(total.total));
          setIsLiked(Boolean(find));
        });
      }
    });
  };

  const getEmoji = () => {
    switch (emoji) {
      case "LIKE":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-blue-700" : ""
            }`}
          >
            <Image src={LikeIcons} alt="like" width={20} />
            Like
          </p>
        );

      case "HEART":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-red-500" : ""
            }`}
          >
            <Image src={Heart} alt="heart" width={20} />
            Love
          </p>
        );

      case "LAUGH":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-yellow-500" : ""
            }`}
          >
            <Image src={Haha} alt="haha" width={20} />
            Laugh
          </p>
        );

      case "CRY":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-yellow-500" : ""
            }`}
          >
            <Image src={Cry} alt="cry" width={20} />
            Sad
          </p>
        );

      case "WOW":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-yellow-500" : ""
            }`}
          >
            <Image src={Wow} alt="wow" width={20} />
            Wow
          </p>
        );

      case "ANGRY":
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base ${
              emoji ? "text-orange-700" : ""
            }`}
          >
            <Image src={Angry} alt="angry" width={20} />
            Grừưư
          </p>
        );

      default:
        return (
          <p
            className={`flex items-center gap-2 whitespace-nowrap pl-2 text-base text-[#929292]`}
          >
            <Like />
            Like
          </p>
        );
    }
  };

  const getContentReactionModal = () => {
    return (
      <>
        <Tabs
          className="flex items-center text-base"
          options={options}
          defaultKey={tabsKey}
          handleChange={setTabsKey}
        />
        <TabsContent active={tabsKey} options={options} />
      </>
    );
  };

  const handleGetListReaction = () => {
    dispatch(getListReaction({ post: id, limit: 10 })).then((res: any) => {
      if (res.payload.status === 200) {
        setReactionModal(true);
      }
    });
  };

  const getIconByMode = () => {
    switch (modeProps) {
      case PUBLIC:
        return "🌍";
      case PRIVATE:
        return "🔒";
      case FRIEND:
        return "👭";

      default:
        return "";
    }
  };

  useEffect(() => {
    if (totalReactsProps) setTotalReacts(Number(totalReactsProps));
  }, [totalReactsProps]);

  useEffect(() => {
    setIsLiked(Object.keys(react).length > 0);
  }, []);

  useEffect(() => {
    if (listComments && listComments.length) {
      const find = listComments.find((x) => {
        return x.postId === id;
      });
      if (find) setComments(find.data);
    }
  }, [JSON.stringify(listComments)]);

  useEffect(() => {
    return () => {
      setIsClickedCmt(false);
      setLimit(2);
    };
  }, []);

  useEffect(() => {
    if (isDeletedCmtID) {
      setComments(comments.filter((x) => x.id !== isDeletedCmtID));
      setTotalComments(totalComments - 1);
      dispatch(getCommentsOfPost({ post: id, limit }));
    }
  }, [isDeletedCmtID]);

  useEffect(() => {
    if (typeProps) setEmoji(typeProps);
  }, [typeProps]);

  useEffect(() => {
    if (reactionModal) {
      if (tabsKey !== "ALL") {
        dispatch(getListReaction({ post: id, limit: 10, type: tabsKey }));
      } else {
        dispatch(getListReaction({ post: id, limit: 10 }));
      }
    }
  }, [tabsKey]);

  return (
    <div className={`mb-4 rounded-lg bg-white px-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-2">
          <div
            className="mr-4 h-[45px] w-[45px] cursor-pointer"
            onClick={() => router.push(`/user/${domain}`)}
          >
            <Avatar
              src={authorAvatar}
              alt="avatar"
              width={50}
              className="m-auto h-full w-full rounded-full"
              gender={authorGender}
            />
          </div>
          <div className="">
            <h3
              className="cursor-pointer text-lg font-medium"
              onClick={() => router.push(`/user/${domain}`)}
            >
              {authorName}
            </h3>
            <Tooltip description={dateFormated}>
              <p className="text-sm">
                {timeOfPosts} {getIconByMode()}
              </p>
            </Tooltip>
          </div>
        </div>
        <Dropdown
          content={
            isPersonPage
              ? [
                  {
                    id: "1",
                    title: (
                      <div className="flex items-center gap-2">
                        <PencilSquare />
                        <span>Edit post</span>
                      </div>
                    ),
                    handleClick: () => handleEditPost(),
                  },
                  {
                    id: "2",
                    title: (
                      <div className="flex items-center gap-2">
                        <Trash />
                        <span>Delete this post</span>
                      </div>
                    ),
                    handleClick: () => handleDeletePost(),
                  },
                ]
              : [
                  {
                    id: "1",
                    title: "Report this post",
                    handleClick: () => console.log("haha"),
                  },
                ]
          }
        >
          <button>
            <EllipsisHorizon />
          </button>
        </Dropdown>
      </div>
      <div className="whitespace-pre-line py-2 ">{content}</div>
      {images && images.length > 0 && <PreviewPost data={images} isPost />}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {totalReacts > 0 && (
            <div className="flex items-center">
              <IconButton className="ml-0 mr-1 p-0">
                <Like width={22} color="blue" />
              </IconButton>
              <span
                className="cursor-pointer text-sm hover:underline"
                onClick={handleGetListReaction}
              >
                {isLiked
                  ? `You ${
                      totalReacts - 1 < 1
                        ? ""
                        : `and ${totalReacts - 1} other${
                            totalReacts - 1 > 1 ? "s" : ""
                          }`
                    }`
                  : totalReacts}
              </span>
            </div>
          )}
        </div>
        <div>
          {totalComments > 0 && (
            <div
              className="cursor-pointer"
              onClick={() => getAllCommentsOfPost(id)}
            >
              <span className="pr-1">{totalComments}</span>
              <span>Comment</span>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="-my-3 flex">
        <ReactButton
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`group/item relative justify-center`}
          onClick={handleLikePost}
        >
          {getEmoji()}
        </ReactButton>

        <ActionButton
          className="justify-center"
          onClick={() => getAllCommentsOfPost(id)}
          icon={<Comment />}
          text="Comment"
        />
      </div>
      <Divider />

      {isClickedCmt &&
        (isLoadingListCmt ? (
          <CommentsSkeleton />
        ) : (
          (comments || [])
            .slice(0, limit)
            .map((x: any) => (
              <CommentBox
                setIsDeletedCmtID={setIsDeletedCmtID}
                key={x.id}
                item={x}
              />
            ))
        ))}

      {totalComments > 2 &&
        isClickedCmt &&
        totalComments !== (comments || []).length &&
        totalComments - limit > 0 && (
          <div
            className="cursor-pointer text-sm underline opacity-50 hover:opacity-100"
            onClick={() => {
              setLimit(limit + 10);
              dispatch(getCommentsOfPost({ post: id, limit: limit + 10 }));
            }}
          >
            View more {totalComments - limit} comments
          </div>
        )}
      <CommentForm
        setContentCmt={setContentCmt}
        onSubmit={handleAddComment}
        contentCmt={contentCmt}
        handleChangeFile={handleChangeFile}
        refs={refs}
        id={id}
        isFirstPost={isFirstPost}
      />
      {image && (
        <div className="ml-14 h-20 w-20 pb-4">
          <img className="h-full w-full rounded" src={image} alt="img" />
        </div>
      )}
      <Modal
        showModal={reactionModal}
        showFooter={false}
        content={getContentReactionModal()}
        onClose={() => setReactionModal(false)}
        showTitle={false}
        showHeader={false}
      />
    </div>
  );
}
