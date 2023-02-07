import Moment from "moment";

export const LoadLimit = {
    LimitCar: 8,
    MoreCar: 8,
    SwiperCar: 12,
};

export function convertDateToTimeStamp(date) {
    return Moment(date).toDate().getTime();
}

export function convertTimeStampToDate(time) {
    return Moment(time).format("YYYY-MM-DD");
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function formatPrice(price) {
    return Math.round(price / 1000) + "K";
}

export function formatSecondTime(secondTime) {
    const time = secondTime / 60;
    const hour = (time - (time % 60)) / 60;
    const hourLabel = hour < 10 ? `0${hour}` : `${hour}`;
    const min = time % 60;
    const minLabel = min < 10 ? `0${min}` : `${min}`;

    return `${hourLabel}:${minLabel}`;
}

export function convertToDateTimeObj(time) {
    time = Moment(time).valueOf();

    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    if (days < 10) {
        days = "0" + days;
    }
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) {
        hours = "0" + hours;
    }
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}

export function formatTitleInUrl(title) {
    return toAlias(
        trim(
            title
                .trim()
                .toLowerCase()
                .split(" ")
                .join("_")
                .split("?")
                .join("")
                .split("&")
                .join("")
                .split(",")
                .join("")
                .split(".")
                .join("")
                .split(";")
                .join("")
                .split("/")
                .join("")
        )
    );
}

export const trim = (str) => {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

export const toAlias = (str) => {
    str = trim(str);
    let replaceChr = "-";
    let stripped_str = str;
    stripped_str = stripped_str.replace(/,/g, "");
    let viet = [];
    let i = 0;
    viet[i++] = ["a", "/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g"];
    viet[i++] = ["o", "/ó|ò|ỏ|õ|ọ|ơ|ớ|ờ|ở|ỡ|ợ|ô|ố|ồ|ổ|ỗ|ộ/g"];
    viet[i++] = ["e", "/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g"];
    viet[i++] = ["u", "/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g"];
    viet[i++] = ["i", "/í|ì|ỉ|ĩ|ị/g"];
    viet[i++] = ["y", "/ý|ỳ|ỷ|ỹ|ỵ/g"];
    viet[i++] = ["d", "/đ/g"];
    for (let i = 0; i < viet.length; i++) {
        // eslint-disable-next-line
        stripped_str = stripped_str.replace(eval(viet[i][1]), viet[i][0]); // eslint-disable-next-line
        stripped_str = stripped_str.replace(
            eval(viet[i][1].toUpperCase().replace("G", "g")),
            viet[i][0].toUpperCase()
        );
    }
    if (replaceChr) {
        // eslint-disable-next-line
        return stripped_str
            .replace(/[\W]|_/g, replaceChr)
            .replace(/\s/g, replaceChr)
            .replace(/^\-+|\-+$/g, replaceChr);
    } else {
        return stripped_str;
    }
};

export const stypes = {
    SD: 1,
    WD: 2,
};

export const CarTransmission = {
    0: "Chưa rõ",
    1: "Số tự động",
    2: "Số sàn",
};

export const Transmission = {
    AUTO: 1,
    MANUAL: 2,
};

export const CarFuel = {
    0: "Chưa rõ",
    1: "Xăng",
    2: "Dầu diesel",
};

export const TripStatus = {
    1: "Đang chờ chủ duyệt",
    2: "Đang chờ đặt cọc",
    3: "Đang chờ đặt cọc",
    4: "Đã đặt cọc",
    5: "Đang cho thuê",
    20: "Chủ xe đã từ chối",
    21: "Chủ xe đã huỷ chuyến",
    22: "Chủ xe đã huỷ chuyến",
    23: "Khách thuê đã huỷ chuyến",
    24: "Khách thuê đã huỷ chuyến",
    25: "Chuyến đã kết thúc",
};

export const TOwnerTransactionType = {
    0: "",
    1: "Kết thúc chuyến đi",
    2: "Chủ xe hủy chuyến",
    3: "Khách thuê hủy chuyến",
    21: "Rút tiền",
    40: "Nạp tiền vào tài khoản",
    41: "Trừ tiền tài khoản",
};

export const CarStatus = {
    0: "Không xác định",
    1: "Chờ duyệt",
    2: "Đang hoạt động",
    3: "Đã bị từ chối",
    4: "Đã xoá",
    5: "Tạm ngưng hoạt động",
};

export const CarStatusColor = {
    0: "back",
    1: "orange",
    2: "green",
    3: "gray",
    4: "red",
    5: "gray",
    6: "red",
};
