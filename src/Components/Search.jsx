import Input from "./Input";

function Search({ Search, onHandleValue }) {
  return (
    <div className="flex justify-center gap-2 w-[50%]  h-14 items-center">
      <Input
        div_width={50}
        div_height={60}
        inputWidth={100}
        inputHeight={100}
        value={Search}
        onHandleValue={onHandleValue}
      />
      <svg
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        viewBox="0 0 24 24"
        className="w-6 tab:w-9"
      >
        <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    </div>
  );
}

export default Search;
