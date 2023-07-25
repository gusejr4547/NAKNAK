import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Fishing from './Fishing';
import Login from './Login';


// import { useNavigate } from 'react-router-dom';
// button onClick={() => navigate('/')}>Go Root</button>

function App(props) {
  return (
		<div className='App' style={{
      margin: 'auto',
    //   width: '80%',
    }}>
			<BrowserRouter>
				<Header style={{
              margin:'auto',
             }}/>
				<Routes style={{
              margin:'auto',
             }}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/fishing" element={<Fishing />}></Route>
					<Route path="/Login" element={<Login />}></Route>
					{/* <Route path="/product/:productId" element={<Login />}></Route> */}
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;