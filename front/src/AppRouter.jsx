import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Footer from "./components/common/Footer";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import Fishing from "./components/fishing/Fishing";
import Login from "./components/account/Login";
import Dogam from "./components/dogam/Dogam";
import Signup from "./components/account/Signup";
import Fishpic from "./components/fishing/Fishpic";
import Board from "./components/board/Board";
import CreateFeed from "./components/board/CreateFeed";

// import Getfish from "./components/fishing/Getfish";
import Background from "./components/common/Background";
import Loading from "./components/common/Loading";
import Profile from "./components/user/Profile";
import SeaScene from "./components/fishbowl/SeaScene";
import ImgTest from "./temp/Teacherable/ImgTest";
import Map from "./components/map/Map";
import Inventory from "./components/fishbowl/Inventory";
// import Bowl from "./components/fishbowl/Bowl";
import Balls from "./components/fishbowl/Balls";
import Freshman from "./components/freshman/Freshman";

import Kakao from "./components/account/Kakao";
import Camera from "./components/camera/Camera";
import Dict from "./components/dict/Dict";

import Newbie from "./components/freshman/Newbie";

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
            <Route path="/Dict" element={<Dict />}></Route>
            <Route path="/login/oauth2/code/kakao" element={<Kakao />}></Route>

            {/* <Route path="/Getfish" element={<Getfish />}></Route> */}
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Balls" element={<Balls />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Dogam" element={<Dogam />}></Route>
            <Route path="/ImgTest" element={<ImgTest />}></Route>
            <Route path="/Inventory" element={<Inventory />}></Route>
            <Route path="/Loading" element={<Loading />}></Route>
            <Route path="/SeaScene" element={<SeaScene />}></Route>
            <Route path="/Board" element={<Board />}></Route>
            <Route path="/CreateFeed" element={<CreateFeed />}></Route>
            {/* <Route path="/SeaScene" element={<SeaScene />}></Route> */}
            <Route path="/Profile/:userId" element={<Profile />}></Route>
            <Route path="Camera" element={<Camera />}></Route>
            {/* <Route path="/FishBowl" element={<FishBowl />}></Route> */}

            <Route path="/Map" element={<Map />}></Route>
            <Route path="/Newbie" element={<Newbie />}></Route>
            <Route path="/Freshman" element={<Freshman />}></Route>
            {/* <Route path="/Bowl" element={<Bowl />}></Route> */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default AppRouter;
