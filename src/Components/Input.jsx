function Input({
  id,
  name,
  label,
  type,
  value,
  onHandleValue = () => {},
  onHandleBlur,
  error,
  refe,
  placeHolder,
  div_width = 80,
  div_height = 15,
  inputWidth = 100,
  inputHeight = 40,
  touched = false,
  labelDisable,
}) {
  // const divWidth=div_height
  return (
    <div
      className={`flex flex-col`}
      style={{ width: `${div_width}%`, height: `${div_height}%` }}
    >
      {label && <label className=" w-full text-left text-white">{label}</label>}
      <input
        id={id}
        value={value}
        type={type}
        className={`rounded-md border-2 border-primary_yellow text-black tab:px-5`}
        onChange={(e) => onHandleValue(e)}
        name={name}
        onBlur={onHandleBlur}
        ref={refe}
        placeholder={placeHolder}
        style={{ width: `${inputWidth}%`, height: `${inputHeight}%` }}
      />
      {error && touched && (
        <div className="w-full  text-white text-right italic">{error}</div>
      )}
    </div>
  );
}

export default Input;
