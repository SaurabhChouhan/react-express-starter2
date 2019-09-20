import React from "react";
import { Route, Switch, Redirect } from "react-router-dom"
import LoginFormContainer from "../form/login/LoginFormContainer";
import GalleryListContainer, { } from "../list/gallery/GalleryListContainer";
import HeaderContainer from "../Header/HeaderContainer";

class AppRouter extends React.Component {
    render() {
        return (
            <>
                <HeaderContainer key="header_container" />
                <Switch key="routes">
                    <Route key="home-route" path="/home" exact render={() => {
                        if (this.props.isAuthenticated && this.props.loggedInUser)
                            return <GalleryListContainer />
                        return <Redirect to="/" />
                    }} />
                    <Route key="login-route" path="/" exact render={() => {
                        if (this.props.isAuthenticated && this.props.loggedInUser)
                            return <Redirect to="/home" />
                        return <LoginFormContainer />
                    }} />
                </Switch>
            </>
        );
    }
}

export default AppRouter