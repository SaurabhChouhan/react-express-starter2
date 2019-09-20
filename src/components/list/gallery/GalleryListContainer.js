import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GalleryList from "./GalleryList";

const mapStateToProps=(state)=>({
    list: state.gallery.list
})

const GalleryListContainer = connect(mapStateToProps, null)(GalleryList)
export default GalleryListContainer;