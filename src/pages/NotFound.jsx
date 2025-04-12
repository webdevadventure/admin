const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-poppins">
      <div className="relative">
        <img
          src="404.svg"
          alt="Illustration of people interacting with the number 404"
          className="w-full max-w-3xl"
        />
      </div>
      <div className="mt-8 text-center">
        <h1 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
          OOPS! PAGE NOT FOUND
        </h1>
        <a
          href="/"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-8 rounded-full transition-colors duration-300"
        >
          BACK TO HOME
        </a>
      </div>
    </div>
  );
};

export default NotFound;
