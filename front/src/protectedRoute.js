import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

//protected route for user -- to do protected route for admin
export const ProtectedRouteUser = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(Cookies.get('token')){
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                };
            }}
        />
    );
};

export const ProtectedRouteSupplier = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(Cookies.get('supplierToken')){
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                };
            }}
        />
    );
};
