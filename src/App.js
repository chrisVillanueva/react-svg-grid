import React from "react";
import Rect from './Rect';
import {
  getViewportSize, 
  getGridData, 
  createNodes
} from './helpers';
import "./App.css";

class App extends React.Component {
  state = {
    viewport:  getViewportSize(),
    gridData: getGridData(),
    wallNodes:{},
  };
  
  handleRectClick = e => {
    e.persist();
    e.preventDefault();
    console.log("click => ", e);
  };
  
  handleMouseEnter = e => {
    e.persist();
    const { id } = e.target;
    const { wallNodes }= this.state;
    const updatedWallNodes = {
      ...wallNodes,
    };
    if(updatedWallNodes[id]){
      delete updatedWallNodes[id];
    }
    else {
      updatedWallNodes[id]= true;
    }
    this.setState({
      wallNodes: {
        ...updatedWallNodes,
      }
    });
  }

  render(){
    const {
      viewport, 
      gridData,
      wallNodes,
    } = this.state;
    const {
      handleRectClick, 
      handleMouseEnter
    } = this;
    const handlers =  {
      handleRectClick, 
      handleMouseEnter
    };
    return (
      <div className="App">
        <svg 
          width={(viewport.width - 20)} 
          height={(viewport.height - 20)}
        >
          {createNodes(
            gridData, 
            handlers,
            wallNodes,
            Rect
            )}
        </svg>
      </div>
    );
  }
}


export default App;