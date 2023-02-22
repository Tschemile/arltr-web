import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import IconButton from '@/components/common/IconButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import Chain from '@/components/Icons/Chain';
import Close from '@/components/Icons/Close';
import PencilSquare from '@/components/Icons/PenciSquare';
import PlusIcon from '@/components/Icons/PlusIcon';
import { editProfile } from '@/redux/actions';
import { updateProfile } from '@/redux/features/profile/profileSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface IEditInfoModal {
  onClose: () => void;
  open: boolean;
}

interface ISocialLinkItem {
  link: string;
  index: number;
  setSocialLinks: (value: string[]) => void;
  socialLinks: string[];
  isClose: boolean;
}

const SocialLinkItem = (props: ISocialLinkItem) => {
  const {
    link = '',
    index = 0,
    setSocialLinks = () => {},
    socialLinks = [],
    isClose = false,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');

  const handleDeleteLink = () => {
    const newListLink = socialLinks.filter((_, i) => {
      return i !== index;
    });
    setSocialLinks(newListLink);
  };

  useEffect(() => {
    if (value) {
      const test = socialLinks.map((x, i) => {
        let b = x;
        if (i === index) {
          b = value;
        }
        return b;
      });
      setSocialLinks(test);
    }
  }, [value]);

  useEffect(() => {
    setIsEdit(false);
  }, [isClose]);

  useEffect(() => {
    setValue(link);
  }, [link]);

  if (isEdit)
    return (
      <Input
        className="mb-2 text-base"
        name="socialLinks"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your social link..."
        value={value}
      />
    );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-base">
        <Chain />{' '}
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </div>
      <div className="flex items-center">
        <span className="cursor-pointer" onClick={() => setIsEdit(true)}>
          <PencilSquare />
        </span>
        <span className="cursor-pointer" onClick={handleDeleteLink}>
          <Close />
        </span>
      </div>
    </div>
  );
};

export default function EditInfoModal(props: IEditInfoModal) {
  const dispatch = useAppDispatch();
  const { open = false, onClose = () => {} } = props;
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const {
    status = 'NONE',
    work = '',
    socialLinks: socialLinksProp = [],
  } = profileUser;
  const options = [
    {
      id: '1',
      label: 'Single',
      value: 'SINGLE',
    },
    {
      id: '2',
      label: 'In Relationship',
      value: 'RELATIONSHIP',
    },
    {
      id: '3',
      label: 'Married',
      value: 'MARRIED',
    },
    {
      id: '4',
      label: 'Engaged',
      value: 'ENGAGED',
    },
    {
      id: '5',
      label: 'None',
      value: 'NONE',
    },
  ];

  const [info, setInfo] = useState({
    status: 'NONE',
    work: '',
  });

  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [valueSocial, setValueSocial] = useState('');
  const [isAddWork, setIsAddWork] = useState(false);
  const [isAddLink, setIsAddLink] = useState(false);
  const [isEditWork, setIsEditWork] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setInfo({ work: '', status: 'NONE' });
    setValueSocial('');
    setIsEditWork(false);
    setIsClose(!isClose);
    setIsAddLink(false);
  };

  const onSubmit = () => {
    const newInfo = Object.assign(info, {
      socialLinks: valueSocial ? [...socialLinks, valueSocial] : socialLinks,
    });
    dispatch(editProfile(newInfo)).then((res: any) => {
      const {
        payload: { status: statusCode = 200, data: { profile = {} } = {} } = {},
      } = res;
      if (statusCode === 200) {
        dispatch(updateProfile({ ...profileUser, ...profile }));
        handleClose();
      }
    });
  };

  const getContentModal = () => {
    return (
      <>
        <div>
          <strong>Edit info</strong>
          <p className="text-base">Your info update will be public.</p>
        </div>
        <div className="my-2">
          <strong>Status</strong>
          <Select
            className="mt-2 block w-full"
            handleChange={handleChange}
            defaultValue={info.status}
            options={options}
            name="status"
          />
        </div>
        <div className="my-2">
          <strong>Work</strong>
          {work ? (
            <>
              {!isEditWork && (
                <div className="flex items-center justify-between text-base">
                  {work}{' '}
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsEditWork(true)}
                  >
                    <PencilSquare />
                  </span>
                </div>
              )}
            </>
          ) : (
            <div
              className="my-2 flex cursor-pointer items-center gap-2 text-base"
              onClick={() => setIsAddWork(!isAddWork)}
            >
              <IconButton className="ml-0 p-1">
                <PlusIcon />
              </IconButton>
              <span>Add your workplace</span>
            </div>
          )}
          {(isAddWork || isEditWork) && (
            <Input
              className="text-base"
              name="work"
              onChange={handleChange}
              value={info.work}
              placeholder="Type your workplace..."
            />
          )}
        </div>
        <div className="my-2">
          <strong>Social Links</strong>
          <div
            className="my-2 flex cursor-pointer items-center gap-2 text-base"
            onClick={() => setIsAddLink(!isAddLink)}
          >
            <IconButton className="ml-0 p-1">
              <PlusIcon />
            </IconButton>
            <span>Add link</span>
          </div>
          <>
            {socialLinks?.map((x, index) => (
              <SocialLinkItem
                link={x}
                index={index}
                key={index}
                setSocialLinks={setSocialLinks}
                socialLinks={socialLinks}
                isClose={isClose}
              />
            ))}
          </>
          {isAddLink && (
            <Input
              className="text-base"
              name="socialLinks"
              onChange={(e) => setValueSocial(e.target.value)}
              placeholder="Type your social link..."
              value={valueSocial}
            />
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    setInfo({ work, status });
    if (socialLinksProp) setSocialLinks(socialLinksProp);
  }, [profileUser, open]);

  return (
    <div>
      <Modal
        title="Edit detail"
        textSubmitButton="Edit detail"
        showModal={open}
        content={getContentModal()}
        onClose={handleClose}
        onSubmit={onSubmit}
        // loading={isUpdatePost}
      />
    </div>
  );
}
