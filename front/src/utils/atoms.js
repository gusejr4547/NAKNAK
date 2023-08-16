import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
//  vue의 state

export const loginuser = atom({
  key: "loginuser",
<<<<<<< HEAD
  default: {},
=======
  default: undefined,
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
  effects_UNSTABLE: [persistAtom],
});

export const token = atom({
  key: "token",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

<<<<<<< HEAD
export const fishingMode_recoil = atom({
  key: "fishingMode_recoil",
  default: "selectMode",
=======
export const profileData_recoil = atom({
  key: "profileData_recoil",
  default: {},
  // effects_UNSTABLE: [persistAtom],
});

export const favoritePoint_recoil = atom({
  key: "favoritePoint_recoil",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const fishingMode_recoil = atom({
  key: "fishingMode_recoil",
  default: "selectMode",
  effects_UNSTABLE: [persistAtom],
});
export const sleeping_recoil = atom({
  key: "sleeping_recoil",
  default: "true",
  effects_UNSTABLE: [persistAtom],
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
});

export const getFish_recoil = atom({
  key: "getFish_recoil",
  default: 0,
<<<<<<< HEAD
=======
  effects_UNSTABLE: [persistAtom],
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
});

export const time_recoil = atom({
  key: "time_recoil",
  default: { s: 0, m: 0, h: 0, today: 0 },
<<<<<<< HEAD
=======
  effects_UNSTABLE: [persistAtom],
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
});

export const mapModal_recoil = atom({
  key: "mapModal_recoil",
  default: false,
<<<<<<< HEAD
});
export const fishingInfo_recoil = atom({
  key: "fishingInfo_recoil",
  default: {},
=======
  // effects_UNSTABLE: [persistAtom],
});
export const weatherInfo_recoil = atom({
  key: "weatherInfo_recoil",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
// export const fishingInfo_recoil = atom({
//   key: "fishingInfo_recoil",
//   default: {},
//   effects_UNSTABLE: [persistAtom],
// });
export const myLocation_recoil = atom({
  key: "myLocation_recoil",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
export const mooltae_recoil = atom({
  key: "mooltae_recoil",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const newbie_recoil = atom({
  key: "newbie_recoil",
  default: false,
  effects_UNSTABLE: [persistAtom],
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

export const tts_recoil = atom({
  key: "tts_recoil",
  default: null,
  effects_UNSTABLE: [persistAtom],
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
});
