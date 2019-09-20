import {connect} from 'react-redux'
import Header from './Header'
import { logOutUser } from '../../actions/userAction';

const mapStateToProps = (state)=>({
    isAuthenticated: state.user.isAuthenticated,
    loggedInUser: state.user.loggedIn
})

const mapDispatchToProps = (dispatch, ownProps)=>({
    logout: ()=>{
        dispatch(logOutUser());
    }
})

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
export default HeaderContainer;