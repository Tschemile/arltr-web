import Image from 'next/image';
import { useRouter } from 'next/router';

import PageNotFound from '@/assets/404.gif';
import Button from '@/components/common/Button';

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => router.push('/');

  return (
    <section>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-[50vh] w-screen bg-center">
          <Image src={PageNotFound} alt="help" className="m-auto h-full" />
        </div>
        <div className="text-center">
          <h1>
            <strong>Oops!!</strong> Something went wrong
            <p>The page you are looking for not avaible!</p>
          </h1>
          <Button onSubmit={handleBack} className="mx-auto my-2">
            Go to Home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
