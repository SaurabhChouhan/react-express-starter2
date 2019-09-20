import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUserOnServer } from "../../../actions/userAction";

const mapStateToProps = (state)=>({
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = (dispatch, ownProps)=> ({
    onSubmit: (values)=>{
        console.log(values);
        dispatch(loginUserOnServer(values))
    }
})

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default LoginFormContainer;