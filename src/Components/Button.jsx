function Button({
  children,
  bold = false,
  onHandleSubmit,
  width = 100,
  type,
  padding,
}) {
  return (
    <button
      className={`bg-primary_yellow w-[${width}%] h-10 rounded-md text-sm tab:text-xl mt-3 ${
        bold && "font-bold"
      }  `}
      onClick={onHandleSubmit}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
