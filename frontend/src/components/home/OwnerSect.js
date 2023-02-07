import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bg_owner1 from "../../static/images/media/homev1/bg-main-1.jpg";

function OwnerSect() {
    return (
        <div className="owner__sect">
            <div className="ex-container">
                <div className="bg-inner-wrap">
                    <img src={bg_owner1} />
                </div>
                <div className="inner-wrap">
                    <h2>Bạn muốn cho thuê xe ô tô</h2>
                    <p>
                        Trở thành đối tác của chúng tôi để có cơ hội kiếm thêm thu nhập hàng tháng.
                    </p>
                    <div className="has-2btn">
                        <Link to="" className="btn btn-dark btn-m me-3">
                            Tìm hiểu ngay
                        </Link>
                        <Link to="" className="btn btn-primary btn-m">
                            Đăng ký xe
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OwnerSect);
