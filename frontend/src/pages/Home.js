import { useEffect, useState } from "react";
import { stypes } from "../components/common/Common";
import {
    CarAreaSect,
    Destination,
    FeatureSect,
    OwnerSect,
    TutorialSect,
} from "../components/home/_Index";

import { CarApi, TotalDriveAPI } from "../api/_IndexApi";

// url= "/"
function Home() {
    const [sdTopDes, setSdTopDes] = useState([]);
    const [wdTopDes, setWdTopDes] = useState([]);
    const [sdAreaCar, setSdAreaCar] = useState([]);
    const [wdAreaCar, setWdAreaCar] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // setSdTopDes(data);
        // setWdTopDes(data);

        CarApi.GetTopCar()
            .then((res) => {
                setSdAreaCar(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        CarApi.GetTopCarWithDriver()
            .then((res) => {
                setWdAreaCar(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        TotalDriveAPI.GetTotalDrive().then((res) => {
            setSdTopDes(res.sdTopDes);
            setWdTopDes(res.wdTopDes);
        });
    }, []);
    return (
        <>
            <div className="pre-wrap-home">
                <div className="wrap-home">
                    <img src="https://netwebapi1.blob.core.windows.net/images-container/241338807_2300940316706206_3460706779179671872_n_20221021025714241338807_2300940316706206_3460706779179671872_n.webp"></img>
                    <FeatureSect />
                    <TutorialSect />
                    <Destination stype={stypes.SD} topDests={sdTopDes} />
                    <Destination stype={stypes.WD} topDests={wdTopDes} />
                    <OwnerSect />
                    {sdAreaCar[0] && <CarAreaSect stype={stypes.SD} cars={sdAreaCar} />}
                    {wdAreaCar[0] && <CarAreaSect stype={stypes.WD} cars={wdAreaCar} />}
                </div>
            </div>
        </>
    );
}

export default Home;
