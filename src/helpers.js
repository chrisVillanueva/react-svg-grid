import React from "react";
import {
  RECT_CSS_CLASSES, 
  RECT_STYLE_OBJ,
  RECT_ACTIVE_NODE_FILL,
} from './constants';

export const getViewportSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

export const getGridData = () => {
  let data = [];
  // starting xpos and ypos at 1 so
  // the stroke will show when we
  // make the grid below
  let xpos = 1;
  let ypos = 1;
  const viewport = getViewportSize();
  const width = 40;
  const height = 40;

  // iterate for rows
  for (let row = 0; row < Math.floor(viewport.height / height) - 1; row++) {
    data.push([]);
    // iterate for cells/columns inside rows
    for (
      var column = 0;
      column < Math.floor(viewport.width / width) - 1;
      column++
    ) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        isWall: "false",
      });
      // increment the x position. I.e. move
      // it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after
    // a row is complete
    xpos = 1;
    // increment the y position for the
    // next row. Move it down 50
    // (height variable)
    ypos += height;
  }
  return data;
};


export const createNodes = (data, handlers, wallNodes, Rect) =>
  data.map((row, rowIdx) => (
    <g key={rowIdx} className="row">
      {row.map((r, colIdx) => {
        const sku = `${rowIdx}-${colIdx}`;
        const rectStyles = (wallNodes[sku])
          ? { ...RECT_STYLE_OBJ, fill: RECT_ACTIVE_NODE_FILL}
          : RECT_STYLE_OBJ;
        return (
          <Rect
            key={sku}
            id={sku}
            handleClick={handlers.handleRectClick}
            handleMouseEnter={handlers.handleMouseEnter}
            cssClasses={RECT_CSS_CLASSES}
            x={r.x}
            y={r.y}
            width={r.width}
            height={r.height}
            style={rectStyles}
          />
        )
      }
    )}
    </g>
  ));
