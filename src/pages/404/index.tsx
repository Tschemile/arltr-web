import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => router.push('/');

  return (
    <section>
      <div className="flex min-h-screen  animate-[help_0.5s_ease-in-out_infinite] flex-col items-center justify-center">
        <div className="h-[70vh] w-screen bg-center bg-no-repeat">
          <h1 className="text-center text-6xl">404</h1>
          <img
            src="https://thumbs.gfycat.com/LegitimateTediousFattaileddunnart-max-1mb.gif"
            alt="help"
            className="m-auto"
          />
        </div>
        <div className="-mt-40 text-center">
          <h3 className="">Look like you&rsquo;re lost</h3>

          <p>the page you are looking for not avaible!</p>

          <button onClick={handleBack} className="m-auto mt-2 w-20">
            Go to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
