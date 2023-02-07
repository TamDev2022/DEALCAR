import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { CommonErr } from "../common/CommonErr";
import { LoadingInline } from "../common/Loading";
import { MessageBox } from "../common/MessageBox";

export default function CarSettingPhoto(props) {
    const [state, setState] = useState({
        err: CommonErr.INNIT,
        errMsg: "",
        photos: props.photos,
    });

    function onUploadBtnClick() {}
    function removeCarPhoto() {}
    function hideResizeBox() {}
    function hideMessageBox() {}

    function onUploadBtnClick() {}

    return (
        <div className="content">
            <div className="content-container">
                <div className="space m"></div>
                <div className="list-photos settings">
                    <div className="list-thumb">
                        {state.photos.map((photo) => (
                            <div key={photo.id} className="obj-photo">
                                <div className="fix-img no-drag">
                                    <img src={photo.thumbUrl} alt="DealCar - Thuê xe tự lái" />
                                </div>
                                <button
                                    className="func-remove btn btn-danger btn--m"
                                    onClick={() => removeCarPhoto(photo)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <MessageBox
                        show={state.uploadErr < CommonErr.SUCCESS}
                        hideModal={hideMessageBox}
                        message={state.uploadErrMsg}
                    />
                </div>
                <div className="btn-file mb-4">
                    <input type="file" />
                </div>
                <button className="btn btn-primary">Lưu thay đổi</button>
            </div>
        </div>
    );
}
