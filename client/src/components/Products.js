import React, { useState, useEffect } from  'react';

import { Product } from './Product';
import { AddEditProduct } from './AddEditProduct';
import { getProducts, addProduct, modifyProduct, removeProduct } from '../api';
import { userAuth, adminAuth } from '../authentication';


export const Products = () => {
    const[state, setStateVars] = useState({products:[], error:null, enabled: true, selectedProduct: {}, filterObject: {}});

    const fetchProducts = (state, filter) => {
        getProducts(filter)
        .then(data => {
            setStateVars({...state, products:data });
        })
        .catch(err => {
            setStateVars({ error: err });
        });
    }

    useEffect(() => {
        fetchProducts(state, '');
    }, []);

    const handleCancel = () => {
        if(!state.enabled) {
            alert('Cancelling the edit');
            setStateVars({...state, enabled: true, selectedProduct: {} });
        }
    }

    const handleSave = (user) => {
        if(state.enabled) {
            addProduct(state.selectedProduct, user)
            .then((result => {
                if(typeof result == 'string' && result.includes('failed')) {
                    alert(result);
                }
                let newProducts = state.products;
                newProducts.push(result);
                setStateVars({...state, products: newProducts, selectedProduct: {}});
            }))
            .catch(err => alert('Unable to Save', err));
        }else {
            modifyProduct(state.selectedProduct, user)
            .then(result => {
                if(typeof result == 'string' && result.includes('failed')) {
                    alert(result);
                }
                let modified = state.products.find(item => item.id === result.id)
                modified.description = state.selectedProduct.description;
                modified.model = state.selectedProduct.model;
                modified.model = state.selectedProduct.model;
                setStateVars({...state, selectedProduct: {}, enabled: true  });
            })
            .catch(err => alert(err));
        }
    }

    const handleSaveAdmin = () => {
        handleSave(adminAuth);
    }

    const handleSaveUser = () => {
        handleSave(userAuth);
    }

    const handleChange = event => {
        const property = event.target.name;
        let value = event.target.value;
        let edited = state.selectedProduct;
        Object.assign(edited, {[property]:value});
        setStateVars({...state, selectedProduct: edited});
    }

    const handleEdit = product => {
        setStateVars({...state, selectedProduct: product, enabled: false});
    }
    const handleDelete = (product, user) => {
        removeProduct(product.id, user)
        .then(result => {
            if(typeof result === "string" && result.includes('failed')) {
                alert(result);
            }
            let newProducts = state.products.filter(item => item.id !== result);
            setStateVars({...state, products: newProducts });
            
        })
        .catch(err => alert(err));
    }

    const handleDeleteAdmin = product => {
        handleDelete(product, adminAuth);
    }

    const handleDeleteUser = product => {
        handleDelete(product, userAuth);
    }

    const handleFilter = () => {
        let filterString = '?';
        let keysArray = Object.keys(state.filterObject);
        let valuesArray = Object.values(state.filterObject);
        keysArray.map(key => {
            const index = keysArray.indexOf(key);
            filterString += key+'='+valuesArray[index]+'&';
        });
        fetchProducts(state, filterString);
    }

    const handleSelect = event => {
        const property = event.target.name;
        const value = event.target.value;

        if(value !== 'Select'){
            state.filterObject[property] = value;
        }else{
            delete state.filterObject[property];
        }
        
    }

    const displayProducts = state.products && 
                            state.products.length > 0 && 
                            state.products.map(product => {
                                return <Product data={product} 
                                                key={product.id} 
                                                onEdit={handleEdit} 
                                                onDeleteAdmin={handleDeleteAdmin}
                                                onDeleteUser={handleDeleteUser} /> 
                            });

    //Section - creating options for the filter dropdown
    let resultProducts = state.products;
    // set objects eliminate duplicates in the options
    let descFilterOptions = resultProducts && resultProducts.length > 0 && new Set(resultProducts.map(item => item.description));
    let modelFilterOptions = resultProducts && resultProducts.length > 0 && new Set(resultProducts.map(item => item.model));
    let branchFilterOptions = resultProducts && resultProducts.length > 0 && new Set(resultProducts.map(item => item.branch));

    descFilterOptions = descFilterOptions && Array.from(descFilterOptions).map(item => <option key={item}>{item}</option> );
    modelFilterOptions = descFilterOptions && Array.from(modelFilterOptions).map(item => <option key={item}>{item}</option> );
    branchFilterOptions = descFilterOptions && Array.from(branchFilterOptions).map(item => <option key={item}>{item}</option>);

    const productHeader = (<><li className = "productHeader">
            <div>Product Id</div>
            <div>Description</div>
            <div> Branch</div>
            <div>Model</div>
        </li>
        <li className = "productHeader">
        <div style={{fontWeight: "400"}}>Filter by:</div>
        <div><select id="branchFilter" name="branch" onChange={e => handleSelect(e)}>
                                <option key="branch1">Select</option>
                                {branchFilterOptions}
                            </select></div>
        <div><select id="branchFilter" name="branch" onChange={e => handleSelect(e)}>
                                <option key="branch1">Select</option>
                                {branchFilterOptions}
                            </select></div>
        <div><select id="modelFilter" name="model" onChange={e => handleSelect(e)}>
                                <option key="model1">Select</option>
                                {modelFilterOptions}
                            </select></div>
                            <div><button onClick={handleFilter}>Apply Filter</button></div>
    </li></>);

    return state.error ? <div className="errorDiv">{state.error}</div> : (<>
                <div className="mainProducts">
                    <div className="products-display">
                        {productHeader}
                        {state.products && state.products.length > 0 ? displayProducts : 'No products. Start by adding a product'}
                    </div>
                    
                        <div className="product-add">
                            <AddEditProduct add={state.enabled} 
                                            product={state.selectedProduct} 
                                            onChange={handleChange} 
                                            onSaveAdmin={handleSaveAdmin} 
                                            onSaveUser={handleSaveUser}
                                            onCancel={handleCancel} />
                        </div> 
                </div>
                {<h5>Kanchan Nataraj </h5>}
            </>);
}