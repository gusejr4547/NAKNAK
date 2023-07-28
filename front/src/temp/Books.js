import React from "react";
import "./Books.css";

const Books = () => {
  const island = document.querySelector(".island");
  console.log(island);
  //   console.log(island);
  //   island[0].hidden = "true";
  //   console.log(island);

  return (
    <div className="wrap">
      <img src="../images/bookcover.png" alt="" className="bookcover" />
    </div>
  );
};

export default Books;
