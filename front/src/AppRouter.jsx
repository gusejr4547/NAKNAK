import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Footer from "./components/common/Footer";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import Fishing from "./components/fishing/Fishing";
import Login from "./components/account/Login";
import Dogam from "./components/account/Dogam";
import Signup from "./components/account/Signup";
import Fishpic from "./components/fishing/Fishpic";
// import Getfish from "./components/fishing/Getfish";
import Background from "./components/common/Background";
import Loading from "./components/common/Loading";
import Infoapi from "./components/map/Infoapi";
// import FishBowl from "./components/fishBowl/FishBowl";
import Profile from "./components/account/Profile";
import SeaScene from "./components/fishbowl/SeaScene";

import Map from "./components/map/Map";
import Inventory from "./components/FishBowl/Inventory";
function AppRouter(props) {
  return (
    <RecoilRoot>
      <div
        className="App"
        style={{
          margin: "auto",
          //   width: '80%',
        }}
      >
        <BrowserRouter>
          <Background />
          {/* <Header style={{
          margin:'auto',
         }}/> */}
          <Routes
            style={{
              margin: "auto",
            }}
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/fishing" element={<Fishing />}></Route>
            <Route path="/Fishpic" element={<Fishpic />}></Route>
            {/* <Route path="/Getfish" element={<Getfish />}></Route> */}
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Dogam" element={<Dogam />}></Route>
            <Route path="/Infoapi" element={<Infoapi />}></Route>
<<<<<<< HEAD
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Inventory" element={<Inventory />}></Route>
=======
            <Route path="/SeaScene" element={<SeaScene />}></Route>
            <Route path="/Profile/:userId" element={<Profile />}></Route>
>>>>>>> feature/auth
            {/* <Route path="/FishBowl" element={<FishBowl />}></Route> */}

            <Route path="/Map" element={<Map />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default AppRouter;
