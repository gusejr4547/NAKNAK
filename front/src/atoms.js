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
  default: { s: 0, m: 0, h: 0 }
});

