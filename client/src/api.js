const baseAPI = `http://localhost:7071/api/productsApi`;

export const getProducts = async (filter) => {
    let apiUrl = baseAPI;
    if(filter){
        apiUrl = apiUrl+`${filter}`;
    }
    return await fetch(apiUrl, { method:'GET' })
                .then(response => response.json())
                .catch(err => {
                    throw err.message;
                });
};

export const getProduct = async (id) => {
    return await fetch(`${baseAPI}`+'/'+`${id}`, { method: 'GET'})
                .then(product => product.json())
                .catch(err => err);
}

export const addProduct = async (product, auth) => {
    return await fetch(baseAPI, { 
                    method: 'POST',
                    body: JSON.stringify(product),
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json'
                    }
                })
                .then(result => result.json())
                .catch(err => err);
}

export const removeProduct = async (id, auth) => {
    return await fetch(`${baseAPI}`+'/'+`${id}`, { 
                    method: 'DELETE',
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json'
                    }
                })
                .then(result => result.json())
                .catch(err => err);
}

export const modifyProduct = async (product, auth) => {
    return await fetch(`${baseAPI}`+'/'+`${product.id}`, { 
                    method: 'PUT', 
                    body: JSON.stringify(product),
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/json'
                    }
                })
                .then(result => result.json())
                .catch(err => err);
}