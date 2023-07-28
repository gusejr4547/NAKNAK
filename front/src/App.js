import React from "react";
import "./App.css";
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
import Background from "./components/common/Background";
import Loading from "./components/common/Loading";

// import { useNavigate } from 'react-router-dom';
// button onClick={() => navigate('/')}>Go Root</button>

function App(props) {
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
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Dogam" element={<Dogam />}></Route>
            <Route path="/Loading" element={<Loading />}></Route>

            {/* <Route path="/product/:productId" element={<Login />}></Route> */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
