import React from "react";
import { CommonErr } from "./CommonErr";
import { Modal } from "react-bootstrap";

export function MessageLine(props) {
    return (
        <div style={{ textAlign: "center", padding: "10vh" }}>
            <p className="no-result">{props.message}</p>
        </div>
    );
}

export function MessageBox(props) {
    return (
        <Modal show={props.show} onHide={props.hideModal} dialogClassName="modal-sm modal-dialog">
            <Modal.Header closeButton={true} closeLabel={""}>
                <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-default form-s">
                    <div className="textAlign-center">
                        {props.error === CommonErr.SUCCESS ? (
                            <i className="ic ic-verify" />
                        ) : (
                            <i className="ic ic-error" />
                        )}
                        {props.message}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export function MessagePage(props) {
    return (
        <div className="min-height-no-footer" style={{ textAlign: "center", padding: "30vh 10vh" }}>
            <p className="no-result">{props.message}</p>
        </div>
    );
}

// export function MessageNoTrips(props) {
//     return (
//         <div style={{ textAlign: "center", padding: "5vh 10vh 10vh" }}>
//             <img src={trip} className="img-fluid" />
//             <p className="marginTop-xs fontWeight-6 font-14">{props.message}</p>
//             <Link
//                 className="marginTop-s btn btn--m btn-primary"
//                 to={{
//                     pathname: "/find/filter",
//                     search: `address=Hồ Chí Minh`,
//                 }}
//             >
//                 Tìm xe ngay
//             </Link>
//         </div>
//     );
// }

// export function MessageOwnerIncome(props) {
//     return (
//         <Modal show={props.show} onHide={props.hideModal} dialogClassName="modal-sm modal-dialog">
//             <Modal.Header closeButton={true} closeLabel={""}>
//                 <Modal.Title>THU NHẬP ƯỚC TÍNH CỦA CHỦ XE</Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="owner-register-body">{props.message}</Modal.Body>
//         </Modal>
//     );
// }
