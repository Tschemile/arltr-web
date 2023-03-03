import PreviewPost from '@/components/common/PreviewPost';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { useAppSelector } from '@/redux/hooks';

interface IContent {
  data: Record<string, string>[];
  className?: string;
  childClassName?: string;
}

export const ContentPhotos = (props: IContent) => {
  const { data = [], className = '', childClassName = '' } = props;
  const loadingCurrentUser = useAppSelector(
    (state) => state.auth.isLoading.loadingCurrentUser
  );
  if (loadingCurrentUser)
    return (
      <CardSkeleton
        total={6}
        className={`grid grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6`}
      />
    );

  return (
    <>
      {data.length <= 0 ? (
        <p className="text-center">Don&lsquo;t have any photo here!! 😄😄😄 </p>
      ) : (
        <div
          className={`${className} grid grid-cols-2 gap-2 px-4 py-6 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6`}
        >
          {data.map((x) => (
            <div
              key={x.id}
              className={`col-span-1 h-[calc(50vw-0.25rem-28px)] max-h-[calc(50vw-0.25rem-28px)] 
            sm:h-[calc((100vw-1.5rem-56px)/4)] sm:max-h-[calc((100vw-1.5rem-56px)/4)] 
            md:h-[calc((100vw-2rem-56px)/5)] md:max-h-[calc((100vw-2rem-56px)/5)] 
            lg:h-[calc((80vw-2rem-56px)/5)] lg:max-h-[calc((80vw-2rem-56px)/5)] 
            xl:h-[calc((70vw-2rem-56px)/5)] xl:max-h-[calc((70vw-2rem-56px)/5)] 
            2xl:h-[calc((70vw-3rem-56px)/6)] 2xl:max-h-[(calc(70vw-3rem-56px)/6)] 
            ${childClassName}`}
            >
              <PreviewPost data={x.url} classNameImg="rounded-md" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
