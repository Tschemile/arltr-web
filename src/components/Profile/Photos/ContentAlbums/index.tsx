import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import IconButton from '@/components/common/IconButton';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import BulletList from '@/components/Icons/BulletList';
import PencilSquare from '@/components/Icons/PenciSquare';
import PlusIcon from '@/components/Icons/PlusIcon';
import Trash from '@/components/Icons/Trash';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import {
  createNewAlbum,
  deleteAlbum,
  editAlbum,
  getListAlbums,
} from '@/redux/actions';
import type { IAlbum, IGetAlbums } from '@/redux/actions/Interface';
import { createdAlbum, editedAlbum } from '@/redux/features/albums';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface IAlbumItem {
  item: IGetAlbums;
  handleDeleteAlbum: (id: string) => void;
  setIsEdit: (value: boolean) => void;
  setAlbum: (value: IAlbum) => void;
  setAlbumId: (value: string) => void;
}

const AlbumItem = (props: IAlbumItem) => {
  // const dispatch = useAppDispatch();
  const {
    item = {},
    handleDeleteAlbum = () => {},
    setIsEdit = () => {},
    setAlbum = () => {},
    setAlbumId = () => {},
  } = props;
  const {
    presentation = '',
    name = '',
    id = '',
    mode = 'PUBLIC',
  } = item as IGetAlbums;

  return (
    <div className="col-span-1">
      <>
        <div className="relative h-[200px] w-full">
          <img
            className="h-full w-full rounded-md object-cover"
            src={
              presentation ||
              'https://bpbj.mataramkota.go.id/themes/kenshin-kenshinschool/assets/images/default.jpg'
            }
            alt="albums-img"
          />
          <div className="absolute top-2 right-2">
            <Dropdown
              content={[
                {
                  id: '1',
                  title: (
                    <div className="flex items-center gap-2">
                      <PencilSquare />
                      <span>Edit album</span>
                    </div>
                  ),
                  handleClick: () => {
                    setIsEdit(true);
                    setAlbum({ name, mode });
                    setAlbumId(id);
                  },
                },
                {
                  id: '2',
                  title: (
                    <div className="flex items-center gap-2">
                      <Trash />
                      <span>Delete album</span>
                    </div>
                  ),
                  handleClick: () => handleDeleteAlbum(id),
                },
              ]}
            >
              <IconButton className="bg-[rgba(0,0,0,0.5)] text-white">
                <BulletList />
              </IconButton>
            </Dropdown>
          </div>
        </div>
        <div className="mt-4 overflow-hidden text-base">
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
            <strong>{name}</strong>
          </h3>
        </div>
      </>
    </div>
  );
};

export const ContentAlbums = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [album, setAlbum] = useState<IAlbum>({
    name: '',
    mode: 'PUBLIC',
  });
  const [listAlbums, setListAlbums] = useState<IGetAlbums[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [albumId, setAlbumId] = useState('');

  const isUpdated = useAppSelector((state) => state.albums.isUpdated);
  const { id: userId = '' } = useAppSelector(
    (state) => state.profile.profileUser
  );
  const listAlbumsProps: IGetAlbums[] = useAppSelector(
    (state) => state.albums.listAlbums
  );

  console.log(listAlbumsProps);

  const isLoading = useAppSelector((state) => state.albums.isLoading);

  const options = [
    {
      id: '1',
      label: 'Public',
      value: 'PUBLIC',
    },
    {
      id: '2',
      label: 'Private',
      value: 'PRIVATE',
    },
    {
      id: '3',
      label: 'Friend',
      value: 'FRIEND',
    },
    {
      id: '4',
      label: 'Only me',
      value: 'HIDDEN',
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setAlbum({ ...album, [e.target.name]: e.target.value });
  };

  const getContentModal = () => {
    return (
      <>
        <div className="text-base">
          <label>
            Name<span className="text-red-500">*</span> :
          </label>
          <Input
            placeholder="Enter album name..."
            className="my-2"
            name="name"
            value={album.name}
            onChange={handleChange}
          />
        </div>
        <div className="text-base">
          <label>Select mode :</label>
          <Select
            options={options}
            name="mode"
            handleChange={handleChange}
            className="my-2 block w-full"
            defaultValue={album.mode}
          />
        </div>
      </>
    );
  };

  const onClose = () => {
    setOpenModal(false);
    setAlbum({ name: '', mode: 'PUBLIC' });
    setIsEdit(false);
  };

  const onSubmit = () => {
    if (!isEdit) {
      dispatch(createNewAlbum(album)).then((res: any) => {
        if (res.payload.status === 201) {
          onClose();
          dispatch(createdAlbum(res.payload.data.album));
        }
      });
    } else {
      dispatch(editAlbum({ id: albumId, payload: album })).then((res: any) => {
        if (res.payload.status === 200) {
          onClose();
          dispatch(editedAlbum(res.payload.data.album));
        }
      });
    }
  };

  const handleDeleteAlbum = (id: string) => {
    dispatch(deleteAlbum(id)).then((res: any) => {
      if (res.payload.status === 200) {
        const newList = listAlbums.filter((x) => x.id !== id);
        setListAlbums(newList);
      }
    });
  };

  useEffect(() => {
    if (listAlbumsProps) setListAlbums(listAlbumsProps);
  }, [listAlbumsProps]);

  useEffect(() => {
    if (userId) dispatch(getListAlbums({ user: userId }));
  }, [userId]);

  useEffect(() => {
    setOpenModal(isEdit);
  }, [isEdit]);

  return (
    <>
      <Button className="!rounded-full" onSubmit={() => setOpenModal(true)}>
        <PlusIcon /> <span className="text-base">Create new album</span>
      </Button>
      <>
        {isLoading ? (
          <CardSkeleton
            total={6}
            className="grid grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6"
          />
        ) : (
          <>
            {listAlbums.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6">
                {listAlbums.map((x) => (
                  <AlbumItem
                    item={x}
                    key={x.id}
                    handleDeleteAlbum={() => handleDeleteAlbum(String(x.id))}
                    setIsEdit={setIsEdit}
                    setAlbum={setAlbum}
                    setAlbumId={setAlbumId}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center">
                Don&lsquo;t have any photo here!! 😄😄😄{' '}
              </p>
            )}
          </>
        )}
      </>
      <Modal
        showModal={openModal}
        onClose={onClose}
        textSubmitButton={isEdit ? 'Edit now' : 'Create now'}
        content={getContentModal()}
        title={isEdit ? 'Edit album' : 'Create new album'}
        onSubmit={onSubmit}
        loading={isUpdated}
      />
    </>
  );
};
