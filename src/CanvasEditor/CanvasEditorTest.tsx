import React, { useState, DragEvent, FC } from 'react';
import ReactFlow, {
    Background,
    addEdge,
    removeElements,
    ReactFlowProvider,
    Elements,
    Connection,
    Edge,
    OnLoadParams,
    ElementId,
    Position
} from 'react-flow-renderer';
import { SideBarFloat } from './Variations/Float/SideBarFloat';
import { SideBarFixed } from './Variations/Fixed/SideBarFixed';
import './Variations/Float/SideBarFloat.css';
import { SideBarDraggable } from './Variations/Draggable/SideBarDraggable';
import AndGateNode from './AdditionalParts/AndGate/AndGateNode';


const nodeTypes = {
    andGate: AndGateNode
};

const initialElements: Elements = [
    {
        id: 'connectionline-1',
        type: 'input',
        data: { label: 'Input' },
        position: { x: window.innerWidth / 2 - window.innerWidth / 16, y: window.innerHeight / 4 },
    },
    {
        id: 'node',
        type: 'input',
        sourcePosition: Position.Right,
        data: { },
        position: { x: window.innerWidth / 2 - window.innerWidth / 16, y: window.innerHeight / 2}
    },
    {
        id: 'node1',
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
        data: { },
        position: { x: window.innerWidth / 2 - window.innerWidth / 16, y: window.innerHeight / 4 + window.innerHeight / 8}
    },
    {
        id: 'node2',
        type: 'andGate',
        data: { label: 'AND' },
        position: { x: window.innerWidth / 2 - window.innerWidth / 14, y: window.innerHeight / 4 + window.innerHeight / 4}
    },
    {
        id: 'node3',
        type: 'andGate',
        data: { label: 'AND' },
        position: { x: window.innerWidth / 2 - window.innerWidth / 14, y: window.innerHeight / 4 + window.innerHeight / 4}
    },
    {
        id: 'node4',
        sourcePosition: Position.Left,
        targetPosition: Position.Right,
        data: { },
        position: { x: window.innerWidth / 2 - window.innerWidth / 16, y: window.innerHeight / 4 + window.innerHeight / 8}
    },
];

let id = 0;
const getId = (): ElementId => `dndnode_${id++}`;

type CanvasEditorProps = {
    type: string;
}

export const CanvasEditorTest: FC<CanvasEditorProps> = ( {type} ) => {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState<Elements>(initialElements);

    const onConnect = (params: Edge | Connection) => {
        setElements((elements) => addEdge(params, elements));
        console.log(elements);
    }
    const onElementsRemove = (elementsToRemove: Elements) => {
        setElements((elements) => removeElements(elementsToRemove, elements));
        console.log(elements);
    }
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
                    nodeTypes = {nodeTypes}
                    className = "flow-canvas"
                    nodesConnectable = {true}
                    deleteKeyCode = {46}
                    // onEdgeMouseEnter = {} needed for hover effect
                >
                    <Background 
                        gap = {12}
                        size = {1}
                    />
                    { function() {
                        if(type === 'float') {
                            return <SideBarFloat />
                        } else if (type === 'draggable') {
                            return <SideBarDraggable />
                        } else {
                            return <SideBarFixed />
                        }
                    }()}
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    </div>
    );

}