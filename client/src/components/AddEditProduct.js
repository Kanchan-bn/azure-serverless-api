import React from  'react';
import authentication from '../authentication';

export const AddEditProduct = props => {
    return (
        <>
            <h3>{props.add? 'Add' : 'Edit'} Product</h3>
            <div className="productFields">
                {props.product && props.product.id && <div id="productId">
                    <label>Id: </label>
                    <label className="value">
                        {props.product.id}
                        </label>
                </div>}
                <div id="desc">
                    <label>Description: </label>
                    <input
                    name="description"
                    value={props.product && props.product.description || ''}
                    onChange={(e) => props.onChange(e)}
                    />
                </div>
                <div id="branch">
                    <label>Branch: </label>
                    <input
                    name="branch"
                    value={props.product && props.product.branch || ''}
                    onChange={(e) => props.onChange(e)}
                    />
                </div>
                <div id="model">
                    <label>Model: </label>
                    <input
                    name="model"
                    value={props.product && props.product.model || ''}
                    onChange={(e) => props.onChange(e)}
                    />
                </div>
                <div className="buttonPanel">
                    <button onClick={props.onCancel}>Cancel</button>
                    <button onClick={props.onSaveAdmin}>Save as Admin</button>
                    <button onClick={props.onSaveUser}>Save as User</button>
                </div>
            </div>
        </>
    );
}