import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './screen/login';
import Register from './screen/register';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './screen/home';
import Header from './component/header';
import Registeruser from './screen/registerUser';
import {Restaurant} from './screen/Restaurant';
import {Restaurantdetails} from './screen/restaurantdetails';
import RestaurantDish from './screen/restaurantDish';
import Shopping from './screen/shopping';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createRestaurant" element={<Register />} />
        <Route path="/UserSignUp" element={<Registeruser />} />
        <Route path="/Restaurant" element={<Restaurant />} />
        {/* <Route path="/shopping/:id" element={<Shopping />} /> */}
        <Route path="/Restaurantdetails/:id" element={<Restaurantdetails />} />
        {/* <Route path="/Restaurantdetails/:name/:id" element={<RestaurantDish />} /> */}
      </Routes>
    </>
  );
}

export default App;
