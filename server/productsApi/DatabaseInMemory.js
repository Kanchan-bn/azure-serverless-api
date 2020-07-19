class DatabaseInMemory {
    static products = [];

    static addProduct(product) {
        const productId = this.products.length + 1;
        product.id = productId;
        this.products.push({...product});

        return product;
    };
    
    static removeProduct(productId) {
        let newProducts = [];
        if(this.products) {
            newProducts = this.products.filter(item => item.id !== productId);
            this.products = newProducts;
            return productId;
        }

       return 'Nothing to delete';
    };
    
    static getProduct(productId) {
        const response = this.products.length > 0 ? this.products.find(item => item.id === productId) : "Item not found";

        return response;
    }
    
    static getallProducts(desc, model, branch) {
        let resultProducts = this.products;
        if(resultProducts.length > 0) {
            if(desc) {
                resultProducts = resultProducts.filter(item => item.description === desc);
            }
    
            if(model) {
                resultProducts = resultProducts.filter(item => item.model === model);
            }
    
            if(branch) {
                resultProducts = resultProducts.filter(item => item.branch === branch);
            }
        }
        
        return resultProducts;
    };
}

module.exports = DatabaseInMemory;


