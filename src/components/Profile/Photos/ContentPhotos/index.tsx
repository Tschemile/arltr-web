import { PhotoView } from 'react-photo-view';

import PreviewImage from '@/components/common/PreviewImage';

interface IContent {
  data: Record<string, string>[];
}

export const ContentPhotots = (props: IContent) => {
  const { data = [] } = props;
  if (data.length <= 0)
    return (
      <p className="text-center">Don&lsquo;t have any photo here!! 😄😄😄 </p>
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6">
        <PreviewImage>
          {data.map((x) => (
            <div key={x.id} className="col-span-1">
              <div className="h-full w-full ">
                <PhotoView src={x.url}>
                  <img
                    className="h-full w-full cursor-pointer rounded-md object-cover"
                    src={x.url}
                    alt="photo"
                  />
                </PhotoView>
              </div>
            </div>
          ))}
        </PreviewImage>
      </div>
    </>
  );
};
