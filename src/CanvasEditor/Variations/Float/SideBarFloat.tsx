import React, { DragEvent } from 'react';

export const SideBarFloat = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType); 
    {/* Note: can create one string, but have a parser in the canvas editor that can handle all the different meanings in the actual string text */}
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="parts__menu__wrapper" style = {{width: window.innerWidth, height: window.innerHeight}}>
        <div className="parts-menu">
          <h3>Parts</h3>
          <ul className="parts-menu-list">
            <div className="dndnode-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'input')} draggable>
            Input Node
            </div>
            <div className="dndnode-output" onDragStart = {(event: DragEvent) => onDragStart(event, 'output')} draggable>
              Output Node
            </div>
            <div className = "dndnode-horizontal-input" onDragStart = {(event: DragEvent) => onDragStart(event, 'horizontal-input')} draggable>
              Horizontal Input Node
            </div>
          </ul>
        </div>
      </div>
    </aside>
  );
};