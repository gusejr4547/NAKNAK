import React, { useState, useEffect } from "react";
import { getData, postData } from "../../utils/api";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

import "./Inventory.css";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginUser, setloginuser] = useRecoilState(loginuser);

  return <div> inven</div>;
};

export default Inventory;
