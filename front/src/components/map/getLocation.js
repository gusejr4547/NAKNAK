import React from "react";
import fishingspot from "../../utils/data/fishingspot.json";
import { useRecoilState } from "recoil";
import { location_recoil } from "../../utils/atoms";

function GetLocation() {
  const [location, setLocation] = useRecoilState(location_recoil);

  return <div>getLocation</div>;
}

export default GetLocation;
