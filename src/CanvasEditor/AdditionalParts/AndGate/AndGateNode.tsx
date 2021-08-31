import React, { memo, FC, useState } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, getIncomers, Elements, addEdge } from 'react-flow-renderer';
import { setElements } from 'react-flow-renderer/dist/store/actions';

import './AndGateNode.css';

// OnConnect function
// OnBreak function
// detectBothInputs
// getOutput

/*
ORIGINAL ANDGATENODE
const AndGateNode = ({
    data,
    sourcePosition = Position.Left,
    targetPosition = Position.Right,
}: NodeProps) => (
    <>
        <div className = 'and__gate'>
            <Handle id = 'and__input__a' className = 'and__input__a' type = 'target' position = {sourcePosition} />
            <Handle id = 'and__input__b' className = 'and__input__b' type = 'target' position = {sourcePosition} />
            { data.label }
            <Handle className = 'and__output' type = 'source' position = {targetPosition} onConnect = {onConnect} />
        </div>
    </>
);
*/

const AndGateNode: FC<NodeProps> = ({data, sourcePosition = Position.Left, targetPosition = Position.Right}) => {
    const [currentConnections, setCurrentConnections] = useState<Array<Connection | Edge>>([]);

    const onConnect = (params: Connection | Edge) => {
        if (currentConnections.length > 0) {
            // getOutput(
        } else {
            setCurrentConnections(currentConnections => [...currentConnections, params]);
            console.log(currentConnections);
        }
    }

    // Sources take in inputs from targets, sources do not take in other sources, but if you connect 

    return(
        <>
            <div className = 'and__gate'>
                <Handle id = 'and__input__a' className = 'and__input__a' type = 'source' position = {sourcePosition} onConnect = {onConnect} />
                <Handle id = 'and__input__b' className = 'and__input__b' type = 'source' position = {sourcePosition} onConnect = {onConnect}/>
                { data.label }
                <Handle className = 'and__output' type = 'target' position = {targetPosition} onConnect = {onConnect} />
            </div>
        </>
    );
}

export default memo(AndGateNode);