import React from "react";

const Rect = props => {
  const {
    id,
    handleClick,
    handleMouseEnter,
    cssClasses,
    x,
    y,
    width,
    height,
    style,
  } = props;
  return (
    <rect
      id={id}
      onClick={handleClick}
      className={cssClasses}
      onMouseEnter={handleMouseEnter}
      x={x}
      y={y}
      width={width}
      height={height}
      style={style}
    />
  );
};

export default Rect;