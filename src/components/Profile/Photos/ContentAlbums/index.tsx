import Button from '@/components/common/Button';
import PlusIcon from '@/components/Icons/PlusIcon';

interface IContent {
  data: Record<string, string>[];
}

export const ContentAlbums = (props: IContent) => {
  const { data = [] } = props;

  return (
    <div>
      <Button>
        <PlusIcon /> <span className="text-base">Create new albums</span>
      </Button>
      {data.length <= 0 ? (
        <p className="text-center">Don&lsquo;t have any photo here!! 😄😄😄 </p>
      ) : (
        <div className="grid grid-cols-2 gap-8 px-4 py-6">
          {data.map((x) => (
            <div key={x.id} className="col-span-1">
              <div className="flex items-center">
                <div className="h-[60px] w-[60px]">
                  <img
                    className="h-[60px] w-[60px] rounded-md object-fill"
                    src={x.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-4 overflow-hidden text-base">
                  <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <strong>{x.name}</strong>
                  </h3>
                  <p>
                    {x.total} member {Number(x.total) > 1 && 's'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
