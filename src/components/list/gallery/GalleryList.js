import React from "react";
import Dialog from "react-bootstrap-dialog";

class GalleryList extends React.Component {
    constructor() {
        super();
        this.showImageDialog = this.showImageDialog.bind(this);
    }
    showImageDialog = (data) => {
        console.log(data)
        let date = new Date(data.data.date)
        this.dialog.show({
            title: <div className="row">
                <div className="col-md-10 text-center">
                    <h4 >{data.data.name}</h4>
                    <p className="para">
                        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}&nbsp;
                {date.getHours()}:{date.getMinutes()}
                    </p>
                </div>
                <div className = "col-md-2">
                        <button className="btn btn-link logoutBtn close" onClick={() => { this.dialog.onHide() }}>X</button>
                    </div>
            </div>,
            body: <div className="container" style={{ overflow: 'auto' }}>
                <img className="image-dialog" src={data.data.url} />
            </div>,
            bsSize: 'md',
        })
    }
    render() {
        return (
            <>
                <Dialog ref={(el) => {
                    this.dialog = el
                }} />
                <div className="galleryList">
                    {this.props.list.map((e) => {
                        let date = new Date(e.date)
                        return (
                            <div id="gallery">
                                <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
                                <div className="imgList">
                                    {e.gallery.map((data) =>
                                        <div onClick={() => { this.showImageDialog({ data }) }}>
                                            <img className="img" src={data.url} />{/*  height="100" width="100"/> */}
                                        </div>
                                    )}
                                </div>
                            </div>)
                    })}
                </div>
            </>
        );
    }
}
export default GalleryList