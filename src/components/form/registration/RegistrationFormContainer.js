import { connect } from "react-redux";
import RegistrationForm from "./RegistrationForm";
import { registerUserOnServer } from "../../../actions/userAction";

const mapStateToProps = (state)=>({

})

const mapDispatchToProps = (dispatch, ownProps)=> ({
    onSubmit: (values)=>{
        console.log(values);
        dispatch(registerUserOnServer(values))
    }
})

const RegistrationFormFormContainer = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
export default RegistrationFormFormContainer;