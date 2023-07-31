import axios from 'axios';
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";

const [loginData, setloginData] = useRecoilState(loginuser);
const [accessToken, setAccessToken] = useRecoilState(token);


const API = axios.create({
    baseURL: '/api',
    withCredentials: true,
  });
  

API.interceptors.request.use(
(config) => {
    config.headers = {
        // authorization: `Bearer ${accessToken}`
        authorization: accessToken
      };
    // 헤더에 토큰이 없는 상태
    if (!API.defaults.headers['authorization']) {
        API.defaults.headers['authorization'] = accessToken;
        // API.defaults.headers['jwt-refresh-token'] = getLocalRefreshToken();
    }

    return config;

},
(error) => {
    return Promise.reject(error);
}
);

API.interceptors.response.use(
(response) => {
    return response;
},
async (error) => {
    const {
    response: { status },
    } = error;

    if (status === 401) {
    try {
        const response = await API.get('/api/reissue');

        // 새 access token을 헤더와 localStorage에 저장
        const newAccessToken = response.headers['authorization'];
        API.defaults.headers['authorization'] = newAccessToken;
        error.config.headers['authorization'] = newAccessToken;
        setAccessToken(newAccessToken);

        const originalResponse = await API.request(error.config);
        return originalResponse;
    } catch (err) {
        new Error(err);
    }
    }
    return Promise.reject(error);
}
);

export default API;