import React from "react";
import Dialog from "react-bootstrap-dialog";
import { Modal, Button } from 'react-bootstrap'

class GalleryList extends React.Component {
    constructor() {
        super();
        // this.showImageDialog = this.showImageDialog.bind(this);
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.state = { showModal: false };
    }
    // showImageDialog = (data) => {
    //     console.log(data)
    //     this.setState({showModal: true})
    //     // let date = new Date(data.data.date)
    //     // this.dialog.show({
    //     //     title: <div className="row">
    //     //         <div className="col-md-10 text-center">
    //     //             <h4 >{data.data.name}</h4>
    //     //             <p className="para">
    //     //                 {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}&nbsp;
    //     //         {date.getHours()}:{date.getMinutes()}
    //     //             </p>
    //     //         </div>
    //     //         <div className="col-md-2">
    //     //             <button className="btn btn-link logoutBtn close" onClick={() => { this.dialog.onHide() }}>X</button>
    //     //         </div>
    //     //     </div>,
    //     //     body: <div className="container" style={{ overflow: 'auto' }}>
    //     //         <img className="image-dialog" src={data.data.url} />
    //     //     </div>,
    //     //     bsSize: 'lg',
    //     // })

    // }
    getInitialState() {
        return { showModal: false };
    }

    close() {
        this.setState({ showModal: false, data: null, date: null });
    }

    open(data) {
        console.log("data ", data)
        let date = new Date(data.date)
        this.setState({ showModal: true, data: data, date: date });
    }
    render() {
        console.log("this.state ", this.state)
        return (
            <>
                {/* <Dialog ref={(el) => {
                    this.dialog = el
                }} /> */}
                {this.state.showModal &&
                    <Modal show={this.state.showModal} onHide={this.close} centered>
                        <Modal.Header closeButton>
                            <div className="dialog-alignment">
                                <Modal.Title>

                                    {this.state.data.name}
                                    <p className="para">
                                        {this.state.date.getDate()}/{this.state.date.getMonth() + 1}/{this.state.date.getFullYear()}&nbsp;
                                                {this.state.date.getHours()}:{this.state.date.getMinutes()}
                                    </p>

                                </Modal.Title>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container" style={{ overflow: 'auto' }}>
                                <img className="image-dialog" src={this.state.data.url} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {/* <Button onClick={this.close}>Close</Button> */}
                        </Modal.Footer>
                    </Modal>}
                <div className="galleryList">
                    {this.props.list.map((e) => {
                        let date = new Date(e.date)
                        return (
                            <div id="gallery">
                                <p>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</p>
                                <div className="imgList">
                                    {e.gallery.map((data) =>
                                        <div >
                                            <img className="img" src={data.url} onClick={() => { this.open(data) }} />
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