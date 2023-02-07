import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header } from "./components/common/_Index";
import {
    CarDetails,
    CarFinding,
    CarSetting,
    CreateCar,
    Dashboard,
    Helper,
    Home,
    MyCars,
    MyTrips,
    Login,
    NoMatch,
    Profile,
    Register,
    Verify,
} from "./pages/_Index";
import { store } from "./redux/store";
import "./styles/main.scss";

function App() {
    const data = 5;
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="helper" element={<Helper />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="verification" element={<Verify />} />
                        <Route path="create-car" element={<CreateCar />} />
                        <Route path="find-car" element={<CarFinding />} />
                        <Route path="mycars" element={<MyCars />} />
                        <Route path="mytrips" element={<MyTrips />} />
                        <Route path="carsetting/:carId" element={<CarSetting />} />
                        <Route path="carsetting/wd/:carId" element={<CarSetting />} />
                        <Route path="car/:carName/:carId" element={<CarDetails />} />
                        <Route path="car/wd/:carName/:carId" element={<CarDetails />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="contact" element={<CreateCar />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                    <Footer />
                </Router>
            </Provider>
        </>
    );
}
export default App;
