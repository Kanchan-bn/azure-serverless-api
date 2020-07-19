import React from 'react';

export const Product = props => {
    return (
        <>
            <li>
                <div>
                    <div>{props.data.id}</div>
                    <div>{props.data.description}</div>
                    <div> {props.data.branch}</div>
                    <div>{props.data.model}</div>
                </div>
                <div className="buttonPanel">
                    <button id="deleteButton" onClick={() => props.onDeleteAdmin(props.data)}>Delete as Admin</button>
                    <button id="deleteButton" onClick={() => props.onDeleteUser(props.data)}>Delete as User</button>
                    <button onClick={() => props.onEdit(props.data)}>Edit</button>
                </div>
            </li>
        </>
    );
}