import React, { DragEvent } from 'react';

export const SideBarDraggable = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
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
          </ul>
        </div>
      </div>
    </aside>
  );
};