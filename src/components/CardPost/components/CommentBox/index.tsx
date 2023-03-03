import type { ChangeEvent, FormEvent } from "react";
import React, { useEffect, useRef, useState } from "react";

import PreviewPost from "@/components/common/PreviewPost";
import PencilSquare from "@/components/Icons/PenciSquare";
import Trash from "@/components/Icons/Trash";
import { deleteComment, editComment, uploadFile } from "@/redux/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Avatar from "../../../common/Avatar";
import Dropdown from "../../../common/Dropdown";
import EllipsisHorizon from "../../../Icons/EllipsisHorizon";
import CommentForm from "../CommentForm";

interface IComment {
  item: Record<string, string>;
  setIsDeletedCmtID?: (value: string) => void;
}

export default function CommentBox(props: IComment) {
  const dispatch = useAppDispatch();
  const refs = useRef<null>(null);
  const { item = {}, setIsDeletedCmtID = () => {} } = props;
  const {
    image: imageProps = "",
    user = {},
    content: contentProps = "",
    id: commentId = "",
  } = item;
  const {
    name = "",
    id: authorId = "",
    avatar = "",
  } = user as Record<string, string>;
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [isEdit, setIsEdit] = useState(false);
  const [contentCmt, setContentCmt] = useState("");
  const [image, setImage] = useState("");

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId)).then((res: any) => {
      if (res.payload.status === 200) {
        setIsDeletedCmtID(commentId);
      }
    });
  };

  const handleEditCmt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editComment({ commentId, payload: { content: contentCmt, image } })
    ).then((res: any) => {
      if (res.payload.status === 200) {
        setContentCmt(res.payload.data.comment.content);
        setImage(res.payload.data.comment.image);
        setIsEdit(false);
      }
    });
  };

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

  useEffect(() => {
    if (contentProps) setContentCmt(contentProps);
  }, [contentProps]);

  useEffect(() => {
    if (isEdit && refs.current) (refs.current as any).focus();
  }, [isEdit]);

  useEffect(() => {
    if (imageProps) setImage(imageProps);
  }, [imageProps]);

  if (isEdit)
    return (
      <>
        <CommentForm
          contentCmt={contentCmt}
          handleChangeFile={handleChangeFile}
          refs={refs}
          setContentCmt={setContentCmt}
          onSubmit={(e) => handleEditCmt(e)}
          id={commentId}
        />
        <p
          className="cursor-pointer pr-4 text-right text-xs text-blue-300"
          onClick={() => {
            setIsEdit(false);
            setContentCmt(contentProps);
          }}
        >
          Cancel
        </p>
        {image && (
          <div className="ml-14 h-20 w-20 pb-4">
            <img className="h-full w-full rounded" src={image} alt="img" />
          </div>
        )}
      </>
    );

  return (
    <div className="group flex  py-2">
      <div className="mr-4 h-10 w-10 min-w-[40px]">
        <Avatar
          src={avatar}
          alt="avatar"
          className="m-auto h-full w-full rounded-full"
        />
      </div>
      <div className="">
        <div className="flex">
          <div className="relative w-fit rounded-lg bg-primary-color p-2 after:absolute after:top-3 after:-left-5 after:border-[10px] after:border-transparent after:border-r-primary-color">
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="whitespace-pre-line text-sm">{contentCmt}</p>
          </div>
          {currentUser.id === authorId && (
            <div className="">
              <Dropdown
                content={[
                  {
                    id: "1",
                    title: (
                      <div className="flex items-center gap-2">
                        <PencilSquare />
                        <span>Edit</span>
                      </div>
                    ),
                    handleClick: () => setIsEdit(true),
                  },
                  {
                    id: "2",
                    title: (
                      <div className="flex items-center gap-2">
                        <Trash />
                        <span>Delete</span>
                      </div>
                    ),
                    handleClick: () => handleDeleteComment(),
                  },
                ]}
              >
                <button>
                  <EllipsisHorizon />
                </button>
              </Dropdown>
            </div>
          )}
        </div>
        {imageProps && (
          <div className="mt-2 h-[200px] w-full">
            <PreviewPost data={image} classNameImg="rounded" />
          </div>
        )}
      </div>
    </div>
  );
}
