import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import CarItem from "../../components/car/CardItem";
import { MessageLine } from "../../components/common/MessageBox";
import { CommonErr } from "../../components/common/CommonErr";
import { LoadingPage } from "../../components/common/Loading";

function ListView(props) {
    let content;
    const HandleMoreCarList = () => {
        props.HandleMoreCarList();
    };

    // if (props.stateFilter.err === CommonErr.INNIT || props.stateFilter.err === CommonErr.LOADING) {
    //     content = <LoadingPage />;
    // } else if (props.stateFilter.err === CommonErr.FAIL && props.stateFilter.errCode <= CommonErr.FAIL) {
    //     content = <MessageLine message={props.stateFilter.errMsgBox} />;
    // } else
    if (props.cars) {
        content = (
            // <div style={{ height: "900px", overflow: "auto" }}>
            <InfiniteScroll
                pageStart={0}
                loadMore={HandleMoreCarList}
                hasMore={true}
                loader={<div className="loader" key={0}></div>}
            >
                <div className="listing-car">
                    <ul>
                        {props.cars.map((car, index) => (
                            <li key={index}>
                                <CarItem car={car} stype={props.stateFilter.stype} />
                            </li>
                        ))}
                        <div className="space m" />
                        <div className="space m" />
                    </ul>
                </div>
            </InfiniteScroll>
            // </div>
        );
    } else {
        content = <MessageLine message="Không tìm thấy xe nào." />;
    }

    return (
        <div className="module-map">
            <div className="map-container">{content}</div>
        </div>
    );
}

export default ListView;
