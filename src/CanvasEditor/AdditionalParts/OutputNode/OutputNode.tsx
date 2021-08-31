import React, { memo } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

import './AndGateNode.css';

// THIS COMPONENT WILL DISPLAY THE OUTPUT

const AndGateNode = ({
    data,
    isConnectable,
    sourcePosition = Position.Left,
    targetPosition = Position.Right,
}: NodeProps) => (
    <>
        <div className = "and__gate">
            <Handle id ='input__a' type = 'target' position = {sourcePosition} isConnectable = {isConnectable} />
            <Handle type = 'source' position = {sourcePosition} isConnectable = {isConnectable} />
            { data.label }
            <Handle type = 'source' position = {targetPosition} isConnectable = {isConnectable} />
        </div>
    </>
);

export default memo(AndGateNode);