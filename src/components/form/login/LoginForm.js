import React from 'react'
import { Field, reduxForm } from "redux-form";

class LoginForm extends React.Component {
    render() {
        return (
            <div id="container" className="container">
                <div className="row">
                    <div className="loginFormParent">
                    <h2 className="text-center">Login Page</h2>
                        <form onSubmit={this.props.handleSubmit} >
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
                            <button type="submit" className="btn btn-primary LoginBtn">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm)
export default LoginForm