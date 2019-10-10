import React from "react";
import { NotificationContainer } from "react-notifications";

class Header extends React.Component {
    render() {
        let props = this.props
        return (
            <section>
                <NotificationContainer />
                <div className="container-fluid main-header">
                    <div className="header-section">
                        <div className="row">
                            {props.isAuthenticated &&

                                <div className="col-md-2 header-user-section">
                                    {props.loggedInUser.fullName}
                                </div>
                            }
                            <div className="image-dialog">
                                <h2>React Snippet</h2>
                            </div>
                            {props.isAuthenticated &&
                                <div className="col-md-2 header-logout-section">
                                    <button className="btn btn-link logoutBtn" onClick={() => { props.logout() }}>Logout</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Header;