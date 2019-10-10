import React from 'react'
import { Field, reduxForm } from "redux-form";
import {Link} from 'react-router-dom'

class RegistrationForm extends React.Component {
    render() {
        return (
            <div id="container" className="container">
                <div className="row">
                    <div className="loginFormParent">
                    <h2 className="text-center">Registration</h2>
                        <form onSubmit={this.props.handleSubmit} >
                            <div className="form-group">
                                <label>Full Name</label>
                                <Field name="fullName" className="form-control " type="text"
                                       placeholder="Enter Full Name" component="input" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <Field name="email" className="form-control " type="email"
                                    placeholder="Enter Email" component="input" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field name="password" type="password" className="form-control "
                                    component="input" placeholder="Enter Password" />
                            </div>
                            <button type="submit" className="btn btn-primary LoginBtn">Sign Up</button>
                        </form>
                        <p><Link to={"/"}>Login</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}
RegistrationForm = reduxForm({
    form: 'registrationForm'
})(RegistrationForm)
export default RegistrationForm