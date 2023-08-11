import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
//  vue의 state

export const loginuser = atom({
  key: "loginuser",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const token = atom({
  key: "token",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const profileData_recoil = atom({
  key: "profileData_recoil",
  default: {},
});
export const favoritePoint_recoil = atom({
  key: "favoritePoint_recoil",
  default: {},
});

export const fishingMode_recoil = atom({
  key: "fishingMode_recoil",
  default: "selectMode",
});

export const getFish_recoil = atom({
  key: "getFish_recoil",
  default: 0,
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
export const myLocation_recoil = atom({
  key: "myLocation_recoil",
  default: {},
});
export const mooltae_recoil = atom({
  key: "mooltae_recoil",
  default: 0,
});

export const newbie_recoil = atom({
  key: "newbie_recoil",
  default: false,
});

export const yolo_recoil = atom({
  key: "yolo_recoil",
  default: undefined,
  // effects_UNSTABLE: [persistAtom],
});

export const location_recoil = atom({
  key: "location_recoil",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
