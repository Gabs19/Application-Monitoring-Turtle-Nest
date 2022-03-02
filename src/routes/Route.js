import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {

    const {signed, loading} = useContext(AuthContext);

    return(
        <Route 
            {...rest}
            render = { props => (
                <Component {...props} />
            )}
        />
    )
}