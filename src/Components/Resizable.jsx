import React, { useState } from "react";

const Resizable = ({ id = "drag-bar", dir, isDragging, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={`hidden bg-primary_yellow tab:block w-3 ${
        (isFocused || isDragging) && "cursor-col-resize"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default Resizable;
