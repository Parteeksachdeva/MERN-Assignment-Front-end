import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute= ({component: Component, restricted, ...rest}) => {
    let token = localStorage.getItem("token")
    //console.log(...rest)
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            token && restricted ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PrivateRoute;