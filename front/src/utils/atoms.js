import { atom } from "recoil";

//  vue의 state

export const loginuser = atom({
  key: "loginuser",
  default: {},
});

export const token = atom({
  key: "token",
  default: {},
});

export const fishingMode_recoil = atom({
  key: "fishingMode_recoil",
  default: "selectMode",
});

export const time_recoil = atom({
  key: "time_recoil",
  default: { s: 0, m: 0, h: 0, today: 0 },
});

export const mapModal_recoil = atom({
  key: "mapModal_recoil",
  default: false,
});
export const fishingInfo_recoil = atom({
  key: "fishingInfo_recoil",
  default: {},
});
