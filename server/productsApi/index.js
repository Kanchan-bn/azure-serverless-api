var DatabaseInMemory = require('./DatabaseInMemory');
var Auth = require('./Auth');

module.exports = async function (context, req) {

    const productId = context.bindingData.productId;
    const authDetails = req.headers.authorization;

    let response = '';

    if (productId) {
        if(req.method == 'GET') {
            response = DatabaseInMemory.getProduct(productId);
            send(context, 200, JSON.stringify(response));
        }
        if(req.method == 'PUT') {
            if(authDetails && authDetails.indexOf('Basic') === -1) {
                send(context, 401, JSON.stringify("Authentication failed"));
            }else{
                const authorised = Auth.getAuthorised(authDetails);
                if(!authorised.role) {
                    send(context, 401, JSON.stringify("Authorisation failed"));
                }else {
                    const newProduct = req.body;
                    if(newProduct) {
                        let existingProduct = DatabaseInMemory.getProduct(productId);
                        existingProduct.description = newProduct.description;
                        existingProduct.branch = newProduct.branch;
                        existingProduct.model = newProduct.model;
                        
                        send(context, 200, JSON.stringify(existingProduct));
                    }else{
                        send(context, 401, JSON.stringify("No body found in the request"));
                    }
                }
            }
        }
        if(req.method == 'DELETE') {
            if(authDetails && authDetails.indexOf('Basic ') === -1) {
                send(context, 401, JSON.stringify("Authentication failed"));
            }else{
                const authorised = Auth.getAuthorised(authDetails);
                if(!authorised.role) {
                    send(context, 401, JSON.stringify("Authorisation failed"));
                }else{
                    response = DatabaseInMemory.removeProduct(productId);
                    send(context, 200, JSON.stringify(response));
                }
            }
        }
    }

    //If no productId is mentioned in the URL
    if(req.method == 'GET') {
        let queryKeys = Object.keys(req.query);
        let queryValues = Object.values(req.query);
        let descFilter = '';
        let modelFilter = '';
        let branchFilter = '';
        
        descFilter = getFilterValue(queryKeys, queryValues, 'description');
        modelFilter = getFilterValue(queryKeys, queryValues, 'model');
        branchFilter = getFilterValue(queryKeys, queryValues, 'branch');

        response = DatabaseInMemory.getallProducts(descFilter, modelFilter, branchFilter);
        send(context, 200, JSON.stringify(response));
    }
    if(req.method == 'POST') {
        if(authDetails && authDetails.indexOf('Basic ') === -1) {
            send(context, 401, JSON.stringify("Authentication failed"));
        }else{
            const authenticated = Auth.getAuthenticated(authDetails);
            if(!authenticated.userId) {
                send(context, 401, JSON.stringify("Authentication failed"));
            }else{
                if(req.body) {
                    response = DatabaseInMemory.addProduct(req.body);
                    send(context, 200, JSON.stringify(response));
                }else{
                    send(context, 401, JSON.stringify('No body in the request'));
                }
            }
        }
    }

    function send(context, status, body) {
        context.res = {
        status: status,
        body: body
        };
    
        context.done();
    }
};

const getFilterValue = (keysArray, valuesArray, key) => {
    let filter = '';
    if(keysArray.includes(key)) {
        filter = valuesArray[keysArray.indexOf(key)];
    }
    return filter;
}