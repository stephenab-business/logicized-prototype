import React, { memo } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

import './AndGateNode.css';

// THIS COMPONENT WILL FEED IN THE INPUTS

const AndGateNode = ({
    data,
    isConnectable,
    sourcePosition = Position.Left,
    targetPosition = Position.Right,
}: NodeProps) => (
    <>
        <div className = "and__gate">
            { data.label }
            <Handle type = 'source' position = {targetPosition} isConnectable = {isConnectable} />
        </div>
    </>
);

export default memo(AndGateNode);