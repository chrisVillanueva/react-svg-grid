import React from "react";
import Rect from './Rect';
import {
  getViewportSize, 
  getGridData, 
  createNodes
} from './helpers';
import {
  START_BLOCKER, 
  END_BLOCKER
} from './constants'
import "./App.css";

class App extends React.Component {
  state = {
    viewport:{},
    gridData: [],
    wallNodes:{},
    isDefiningWall: false,
  };
  
  componentDidMount(){
    this.setState({
      viewport:  getViewportSize(),
      gridData: getGridData(),
      isDefiningWall: false,
    });
  }

  handleDefineWallClick = e => {
    this.setState({
      isDefiningWall:!this.state.isDefiningWall,
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
    const { wallNodes, isDefiningWall }= this.state;

    if(!isDefiningWall){
      return;
    }

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
      isDefiningWall,
    } = this.state;
    const {
      handleRectClick, 
      handleMouseEnter,
      handleResetGridClick,
      handleDefineWallClick,
    } = this;
    const handlers =  {
      handleRectClick, 
      handleMouseEnter
    };
    const wallButtonLabel = (isDefiningWall) 
      ? END_BLOCKER 
      : START_BLOCKER;
    return (
      <div className="App">
        <div className="app-controls">
          <button onClick={handleDefineWallClick}>
            {wallButtonLabel}
          </button>
          <button onClick={handleResetGridClick}>
            Reset Grid
          </button>
        </div>
        <div className="app-ccontainer">
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