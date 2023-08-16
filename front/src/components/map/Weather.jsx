import axios from "../../api/KMAAPI";
import { useRecoilState } from "recoil";
import { weatherInfo_recoil } from "../../utils/atoms";

export async function Weather({ base_date, base_time, nx, ny }) {
  const [weatherInfo, setWeatherInfo] = useRecoilState(weatherInfo_recoil);
  try {
    const response = await axios.get(
      `getVilageFcst?base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`
    );
    console.log("여기임", response.data.response.body.items);
    setWeatherInfo(response.data.response.body.items); // 리코일 상태 업데이트
  } catch (e) {
    console.log(e);
  }
}
