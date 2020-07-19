import React from 'react';

import { Products } from './components/Products';
import { ErrorBoundary } from './ErrorBoundary';


export const App = () => {

        return (
        <>
            <div className="header-bar">Products</div>
            <ErrorBoundary>
                <Products />
            </ErrorBoundary>
        </>
        );

}
