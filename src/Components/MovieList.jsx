import Rating from "./Rating";

function MovieList({ name, cast, image, id, rating }) {
  return (
    <div className="text-white w-full h-full flex flex-col items-center tab:items-start tab:flex-row">
      <div className=" w-full tab:min-h-screen tab:w-[50%] p-5 flex flex-col items-center tab:flex-none">
        <img className="w-[50%] tab:w-[80%]" src={image} alt="" />
        <h2 className="font-bold text-2xl text-primary_yellow">{name}</h2>
        <p className="flex gap-1">
          <svg viewBox="0 0 1024 1024" fill="yellow" className="w-5">
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
          </svg>
          {rating}
        </p>
        <p className="italic px-4">{cast}</p>
      </div>
      <div className=" w-full tab:mt-10 flex justify-center ">
        <Rating id={id} />
      </div>
    </div>
  );
}

export default MovieList;
