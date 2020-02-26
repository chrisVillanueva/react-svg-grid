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
    viewport:{},
    gridData: [],
    wallNodes:{},
  };
  
  componentDidMount(){
    this.setState({
      viewport:  getViewportSize(),
      gridData: getGridData(),
    });
  }

  handleResetGridClick = e => {
    this.setState({
      wallNodes:{},
    });
  }

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
      handleMouseEnter,
      handleResetGridClick,
    } = this;
    const handlers =  {
      handleRectClick, 
      handleMouseEnter
    };
    return (
      <div className="App">
        <div className={"app-controls"}>
          <button onClick={handleResetGridClick}>
            Reset Grid
          </button>
        </div>
        <div className={"app-ccontainer"}>
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

      </div>
    );
  }
}


export default App;