import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();




// 모든 페이지가 최초 두번 렌더링 되는 문제가 발생해서 아래 코드는 주석쳐놓았습니다.
// concurrent mode 를 써야하는 이유가 특별히 없다면

// legacy모드로 하면 좋지 않을까 생각해서 적어놨어요 아래 코드는 레거시모드입니다
// 레거시 모드로 index.js 작성하니깐 페이지 두번 렌더링하는 일이 없어지더라구요

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// reportWebVitals();
