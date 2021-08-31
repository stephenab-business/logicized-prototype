import React, { useState, DragEvent } from 'react';
import ReactFlow, {
    Background,
    addEdge,
    removeElements,
    ReactFlowProvider,
    Elements,
    Connection,
    Edge,
    OnLoadParams,
    ElementId
} from 'react-flow-renderer';
import { SideBarFloat } from './Variations/Float/SideBarFloat';
import './CanvasEditorVariations/Float/save.css';

const initialElements: Elements = [
    {
        id: 'connectionline-1',
        type: 'input',
        data: {  },
        position: { x: window.innerWidth / 2 - window.innerWidth / 16, y: window.innerHeight / 2 - window.innerHeight / 4 },
      },
];

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

export default function CanvasEditorOfficial() {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements); // Good

    const onConnect = (params: Edge | Connection) => setElements((elements) => addEdge(params, elements)); // Good
    const onElementsRemove = (elementsToRemove: Elements) => setElements((elements) => removeElements(elementsToRemove, elements));
    const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);
    
    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    const onDrop = (event: DragEvent) => {
          event.preventDefault();

          if (reactFlowInstance) {
              const type = event.dataTransfer.getData('application/reactflow');
              const position = reactFlowInstance.project({ x: event.clientX - 90, y: event.clientY - 20});
              const newNode = {
                  id: getId(),
                  type,
                  position,
                  data: { }
              };

              setElements((elements) => elements.concat(newNode));
          }
    };
    
    return(
        <div className = "dndflow">
            <ReactFlowProvider>
                <div className = "reactflow-wrapper">
                    <ReactFlow 
                        elements = {elements}
                        onConnect = {onConnect}
                        onElementsRemove = {onElementsRemove}
                        onLoad = {onLoad}
                        onDrop = {onDrop}
                        onDragOver = {onDragOver}
                        style = {{height: window.innerHeight}}
                        className = "flow-canvas"
                    >
                        <Background 
                            gap = {12}
                            size = {1}
                        />
                        {/* <Controls rfInstance={reactFlowInstance} setElements = {setElements} /> */}
                        
                        {/* <SideBarFloat /> */}
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
}