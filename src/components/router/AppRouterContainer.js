import AppRouter from "./AppRouter"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    loggedInUser: state.user.loggedIn
})

const AppRouterContainer = withRouter(connect(mapStateToProps, null)(AppRouter));

export default AppRouterContainer;