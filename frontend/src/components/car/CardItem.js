import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { CarTransmission, formatPrice, formatTitleInUrl, stypes } from "../common/Common";
import carPhotoDefault from "../../static/images/upload/defaultCar.png";

export default function CarItem(props) {
    const { car } = props;
    const isSD = props.stype === stypes.SD;

    return (
        <Link
            to={{
                pathname: `/car/${isSD ? "" : "wd/"}${formatTitleInUrl(car.name)}/${car._id}`,
            }}
            // onClick={(e) => {
            //     e.preventDefault();
            //     return false;
            // }}
        >
            <div className="item-car" onClick={() => {}}>
                <div className="img-car">
                    <div className="fix-img">
                        <img src={`${car.photos[0] ? car.photos[0].thumbUrl : carPhotoDefault}`} />
                    </div>
                    {isSD ? (
                        <span className="label-pos">
                            {car.totalDiscountPercent > 0 && (
                                <span className="discount">Giảm {car.totalDiscountPercent}%</span>
                            )}
                        </span>
                    ) : (
                        <span className="label-pos">
                            {car.wdShort && car.wdShort.totalDiscountPercent > 0 && (
                                <span className="discount">
                                    Giảm {car.wdShort.totalDiscountPercent}%
                                </span>
                            )}
                        </span>
                    )}
                </div>
                <div className="desc-car">
                    <div className="group-line n-price">
                        <h2>{car.name}</h2>
                        {isSD ? (
                            <p className="price">
                                {car.priceOrigin !== car.price && (
                                    <span className="real">{formatPrice(car.priceOrigin)}</span>
                                )}
                                <span className="special">{formatPrice(car.price)}</span>
                            </p>
                        ) : (
                            car.wdShort && (
                                <p className="price">
                                    {car.wdShort.priceOrigin !== car.wdShort.price && (
                                        <span className="real">
                                            {formatPrice(car.wdShort.priceOrigin)}
                                        </span>
                                    )}
                                    <span className="special">
                                        {formatPrice(car.wdShort.price)}
                                    </span>
                                    <span className="unit"> / chuyến</span>
                                </p>
                            )
                        )}
                    </div>
                    <div className="group-line n-rating">
                        {car.totalTrips > 0 && (
                            <span className="star">
                                <StarRatings
                                    rating={car.rating.avg}
                                    starRatedColor="#00a550"
                                    starDimension="17px"
                                    starSpacing="1px"
                                />
                            </span>
                        )}
                        {car.totalTrips > 0 ? (
                            <span>• {car.totalTrips} chuyến</span>
                        ) : (
                            <span>Chưa có chuyến nào</span>
                        )}
                    </div>

                    {isSD && (
                        <div className="group-label marginBottom-xs">
                            <span>{CarTransmission[car.optionsTransmission]}</span>
                        </div>
                    )}

                    <div className="location">
                        <p>
                            <i className="bi bi-geo-alt"></i>
                            {car.locationAddrS}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
